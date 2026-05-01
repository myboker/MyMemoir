const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const port = Number(process.env.PORT || 8787);
const apiBase = process.env.MEMOIR_API_BASE || "https://api.bltcy.ai/v1";
const apiKey = process.env.MEMOIR_API_KEY || process.env.BLTCY_API_KEY || process.env.OPENAI_API_KEY;

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
};

function send(res, status, body, type = "application/json; charset=utf-8") {
  res.writeHead(status, {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET,POST,OPTIONS",
    "access-control-allow-headers": "content-type,authorization",
    "content-type": type,
  });
  res.end(body);
}

async function proxyAgent(req, res) {
  if (!apiKey) {
    send(res, 500, JSON.stringify({ error: "Missing MEMOIR_API_KEY / BLTCY_API_KEY / OPENAI_API_KEY" }));
    return;
  }

  let raw = "";
  req.on("data", (chunk) => {
    raw += chunk;
  });
  req.on("end", async () => {
    try {
      const body = JSON.parse(raw || "{}");
      const model = body.model || "gpt-5.4-nano";
      const messages = body.messages || [];
      const response = await fetch(`${apiBase.replace(/\/$/, "")}/chat/completions`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${apiKey}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: body.temperature ?? 0.6,
        }),
      });

      const text = await response.text();
      send(res, response.status, text);
    } catch (error) {
      send(res, 500, JSON.stringify({ error: error.message }));
    }
  });
}

function collectJson(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(raw || "{}"));
      } catch (error) {
        reject(error);
      }
    });
  });
}

async function callChat(model, messages, temperature = 0.55) {
  if (!apiKey) {
    throw new Error("Missing MEMOIR_API_KEY / BLTCY_API_KEY / OPENAI_API_KEY");
  }

  const response = await fetch(`${apiBase.replace(/\/$/, "")}/chat/completions`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature,
      response_format: { type: "json_object" },
    }),
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(text);
  }

  const payload = JSON.parse(text);
  const content = payload.choices?.[0]?.message?.content || "{}";
  return JSON.parse(content);
}

function organizePrompt(body) {
  return [
    {
      role: "system",
      content:
        "你是一个商业级个人自传写作系统，不是日记总结器。你需要像编辑长篇非虚构/自传小说一样工作：建立事件索引、识别隐含时间、维护章节架构、写出有文学质感和心理深度的自传草稿。禁止把日期范围机械写进正文，禁止流水账，禁止简单拼接原文。输出必须是严格 JSON。",
    },
    {
      role: "user",
      content: JSON.stringify({
        task: "organize_autobiography",
        output_schema: {
          events:
            "Array<{id,title,startDate,endDate,content,summary,tags:string[],themes:string[],importance:number,importanceReason,dateReason,relationIds:string[],relationNotes}>",
          chapters: "Array<{title,purpose,eventIds:string[]}>",
          biography:
            "完整自传草稿。必须是纯字符串正文，不要再嵌套 {text,note}，不要输出 Markdown 代码块，不要输出解释。内容必须是文学化正文，不是提纲。包含序章和若干章，每个事件应被吸收进章节叙事。",
          qualityAudit:
            "{score:number,length:number,problems:string[],revisionNotes:string[]}，score 必须严格自评，低于 85 时必须先自行重写再输出。",
        },
        quality_contract: {
          date_policy:
            "日期只作为内部排序元数据。传记正文禁止密集出现数字年份、年月日、日期范围，尤其禁止 2016/1/1 到 2016/12/31 这种格式。正文里优先使用自然生命阶段表达，比如“小时候”“二十岁前后”“刚离家那几年”“刚工作时”“家里出事的那个冬天”“后来重新写作时”。除非用户原文强依赖某个历史年份，否则不要在正文出现具体数字日期。",
          prose_policy:
            "传记正文必须像自传文学作品，有场景、意象、人物动作、心理变化、后见之明和主题回声。不能是事件记录表。",
          length_policy:
            "每个事件至少扩写为 350-650 中文字；事件越多，章节越完整，整体越长。必须为后续长篇扩展预留章节结构和分块索引策略。",
          graph_policy:
            "为每个事件生成重要性 1-10、关键词、主题、摘要、关联事件 id 和关联理由。重要性影响星云节点，但不要在传记正文中显式写重要性。",
          memory_policy:
            "如果用户已有人工编辑内容，尽量保留其独特措辞和段落判断，除非明显破坏结构。",
          context_strategy:
            "像维护大型代码工程一样维护传记：先建立事件索引，再规划章节，再按章节吸收事件。长篇扩展时不要把所有原文粗暴塞入一个段落，应按章节、主题、人物关系和时间阶段分块。",
        },
        style: body.style,
        events: body.events,
        previousBiography: body.previousBiography || "",
      }),
    },
  ];
}

async function organizeBiography(req, res) {
  try {
    const body = await collectJson(req);
    const model = body.model || "gpt-5.4-2026-03-05";
    const result = await callChat(model, organizePrompt(body), 0.62);
    send(res, 200, JSON.stringify(result));
  } catch (error) {
    send(res, 500, JSON.stringify({ error: error.message }));
  }
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${port}`);

  if (req.method === "OPTIONS") {
    send(res, 204, "");
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/agent") {
    proxyAgent(req, res);
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/organize") {
    organizeBiography(req, res);
    return;
  }

  const requested = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
  const filePath = path.resolve(root, `.${requested}`);

  if (!filePath.startsWith(root)) {
    send(res, 403, "Forbidden", "text/plain; charset=utf-8");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      send(res, 404, "Not found", "text/plain; charset=utf-8");
      return;
    }

    send(res, 200, data, mime[path.extname(filePath)] || "application/octet-stream");
  });
});

server.listen(port, () => {
  console.log(`Life Nebula running at http://localhost:${port}`);
});
