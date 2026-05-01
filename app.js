const STORAGE_KEY = "life-nebula.events";
const BIO_KEY = "life-nebula.biography";
const HISTORY_KEY = "life-nebula.history";
const DEMO_KEY = "life-nebula.demo-v3";

const styleProfiles = {
  self: {
    name: "用户自己的风格",
    opening: "这部传记暂时不追求宏大的判断，而是从那些真正改变过生活纹理的事件写起。",
    sentence: "它保留具体细节、人物关系和后来才理解的情绪，让经历自然连成一条线。",
  },
  kawabata: {
    name: "川端康成式",
    opening: "记忆像夜色里的水，表面安静，深处却藏着长久没有熄灭的微光。",
    sentence: "叙述尽量纤细、克制，在沉默处留下余味。",
  },
  maugham: {
    name: "毛姆式",
    opening: "回看这些经历，最有意思的并不是命运如何安排，而是人在安排里怎样露出真实的性格。",
    sentence: "叙述保持清醒和距离，既写选择，也写选择背后的代价。",
  },
  marquez: {
    name: "马尔克斯式",
    opening: "许多年以后，当这些往事重新聚在一起，它们会显出一种近乎命运的形状。",
    sentence: "叙述带有丰沛的时间感，把日常细节写成一片会回声的大陆。",
  },
  yuhua: {
    name: "余华式",
    opening: "这些事看上去都很平常，可平常的事常常最用力地改变一个人。",
    sentence: "叙述朴素直接，允许荒诞、疼痛和幽默同时存在。",
  },
};

const demoEvents = [
  {
    title: "离开故乡前的河岸",
    start: "2012-06-18",
    end: "2012-08-26",
    content:
      "2012年夏天，高考结束以后，故乡忽然变得比过去安静。白天我在家里收拾那些被课本压弯的旧笔记，傍晚父亲就喊我去河边走走。他不是一个会表达感情的人，走到桥下的时候总是把手背在身后，只说外面吃饭不要太省，遇到事情不要怕。那条河在黄昏里慢得像一块旧布，水面上漂着碎光。我当时只觉得他啰嗦，后来离家很多年，才明白他不是在教我如何去远方，而是在练习怎样把我送走。那年夏天，我第一次意识到，离开不是从车站开始的，是从亲人忽然变得小心翼翼开始的。",
  },
  {
    title: "第一次独自租房",
    start: "2016-09-01",
    end: "2017-01-10",
    content:
      "2016年秋天，我在城市边缘租下第一间真正属于自己的房子。它小得几乎放不下一张像样的桌子，窗外是另一栋楼潮湿的背面，墙角偶尔有水渍。那段时间钱很紧，晚饭常常是一碗面，面汤里浮着很少的葱花。有天雨下得很急，屋里的灯突然坏了，我坐在床边，用手机的光照着半截没吃完的面。那一刻我没有觉得委屈，反而有一种奇怪的清醒：生活第一次完全落到我手里，连它的狼狈也是我的。",
  },
  {
    title: "母亲住院的冬天",
    start: "2019-12-03",
    end: "2020-01-19",
    content:
      "2019年12月，母亲住院。那是一个很冷的冬天，我每天在医院和公司之间来回，早上挤地铁去上班，晚上拎着粥和换洗衣服去病房。病房里总有消毒水和橘子皮混在一起的味道，窗户关不严，风从缝隙里钻进来。母亲怕我担心，总说自己没事，还催我早点回去睡觉。我坐在走廊的长椅上，第一次发现父母也会变得很轻，轻到需要你用沉默和耐心把他们扶住。那个冬天以后，我对长大的理解变了。长大不是忽然变得强大，而是终于承认，有些人会在某一天需要你撑住。",
  },
  {
    title: "辞职后的空白月",
    start: "2022-04-01",
    end: "2022-05-08",
    content:
      "2022年4月，我辞职了。离开公司的那天，电脑交还给行政，门禁卡放进一个透明塑料盒里，我忽然觉得过去几年像被轻轻抽走。辞职后的第一个月，我没有立刻找下一份工作。每天早上我走很远的路，看早餐店升起蒸汽，看城市一点点亮起来。最初我非常焦虑，觉得自己像从轨道上掉了下来。后来有一天，我坐在公园长椅上，听见树叶被风翻动的声音，突然意识到自己不是失去了方向，只是很久没有听见身体和内心说话。",
  },
  {
    title: "重新开始写作",
    start: "2024-11-12",
    end: "2025-02-20",
    content:
      "2024年冬天，我重新开始写作。起初不是因为有宏大的计划，只是一些记忆总在夜里回来：河岸上的父亲，出租屋坏掉的灯，医院走廊里发凉的长椅。它们像没有归档的旧信，堆在心里。写下它们以后，我发现过去并不只是负担，它也是材料。那些我曾经急着逃离、忍受或者忘记的时刻，开始在纸上显出另一种秩序。写作让我明白，一个人并不是被经历简单塑造的，他也可以在多年后重新排列这些经历，并因此重新理解自己。",
  },
];

const elements = {
  status: document.querySelector("#agent-status"),
  title: document.querySelector("#title"),
  startDate: document.querySelector("#entry-start-date"),
  endDate: document.querySelector("#entry-end-date"),
  content: document.querySelector("#content"),
  dateReason: document.querySelector("#date-reason"),
  importance: document.querySelector("#importance"),
  importanceLabel: document.querySelector("#importance-label"),
  importanceReason: document.querySelector("#importance-reason"),
  summary: document.querySelector("#summary"),
  tags: document.querySelector("#tags"),
  themes: document.querySelector("#themes"),
  relations: document.querySelector("#relations"),
  detailToggle: document.querySelector("#detail-toggle"),
  detailPanel: document.querySelector("#detail-panel"),
  saveState: document.querySelector("#save-state"),
  save: document.querySelector("#save-entry"),
  remove: document.querySelector("#delete-entry"),
  create: document.querySelector("#new-entry"),
  organize: document.querySelector("#organize-biography"),
  search: document.querySelector("#search"),
  searchToggle: document.querySelector("#search-toggle"),
  searchPanel: document.querySelector("#search-panel"),
  indexToggle: document.querySelector("#index-toggle"),
  indexPanel: document.querySelector("#index-panel"),
  galaxyCanvas: document.querySelector("#diary-galaxy"),
  galaxyEmpty: document.querySelector("#galaxy-empty"),
  indexList: document.querySelector("#event-index-list"),
  biography: document.querySelector("#biography"),
  outline: document.querySelector("#biography-outline"),
  chapter: document.querySelector("#chapter-select"),
  style: document.querySelector("#style-select"),
  settings: document.querySelector("#settings-toggle"),
  settingsPanel: document.querySelector("#settings-panel"),
  exportText: document.querySelector("#export-text"),
  exportImage: document.querySelector("#export-image"),
  saveBioEdit: document.querySelector("#save-biography-edit"),
  undo: document.querySelector("#undo-version"),
  historyList: document.querySelector("#history-list"),
  writingEffects: document.querySelector("#writing-effects"),
};

let events = loadJson(STORAGE_KEY, []);
let biography = localStorage.getItem(BIO_KEY) || "";
let history = loadJson(HISTORY_KEY, []);
let activeId = events[0]?.id || createDraftEvent().id;
let filteredEvents = [];
let biographyChapters = [];
let saveTimer = 0;

function loadJson(key, fallback) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key));
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  localStorage.setItem(BIO_KEY, biography);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

function uid() {
  return crypto.randomUUID();
}

function todayValue() {
  return toDateInputValue(new Date().toISOString());
}

function createDraftEvent() {
  const now = new Date().toISOString();
  return {
    id: uid(),
    title: "",
    startDate: now,
    endDate: now,
    content: "",
    summary: "",
    tags: [],
    themes: [],
    relationNotes: "",
    relationIds: [],
    importance: 5,
    importanceReason: "尚未分析。",
    createdAt: now,
    updatedAt: now,
  };
}

function toDateInputValue(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function dateInputToIso(value, fallbackIso) {
  if (!value) return fallbackIso;
  const fallback = new Date(fallbackIso || new Date().toISOString());
  const [year, month, day] = value.split("-").map(Number);
  fallback.setFullYear(year, month - 1, day);
  return fallback.toISOString();
}

function formatDate(dateString, style = "short") {
  const date = new Date(dateString);
  const options =
    style === "full"
      ? { year: "numeric", month: "long", day: "numeric" }
      : { year: "numeric", month: "numeric", day: "numeric" };
  return new Intl.DateTimeFormat("zh-CN", options).format(date);
}

function displayTitle(event) {
  return event.title || `${formatDate(event.startDate)} 的经历`;
}

function splitList(value) {
  return value
    .split(/[,，、\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

function seedDemoEvents() {
  if (localStorage.getItem(DEMO_KEY) === "installed") return;
  const demoTitles = new Set(demoEvents.map((item) => item.title));
  const oldDemoTitles = new Set(["离开故乡之前的那个夏天", "第一次独自租房", "母亲住院的冬天", "辞职后的空白月", "重新开始写作"]);
  const looksLikeOldDemo =
    events.length > 0 && events.length <= 6 && events.every((event) => demoTitles.has(event.title) || oldDemoTitles.has(event.title));
  if (events.length > 0 && !looksLikeOldDemo && biography.includes("第1章")) {
    localStorage.setItem(DEMO_KEY, "installed");
    return;
  }

  const demos = demoEvents.map((item) => {
    const event = {
      ...createDraftEvent(),
      title: item.title,
      startDate: new Date(`${item.start}T12:00:00`).toISOString(),
      endDate: new Date(`${item.end}T12:00:00`).toISOString(),
      content: item.content,
    };
    return analyzeEvent(event, events);
  });

  events = demos.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  activeId = events[0].id;
  biography = generateBiography(events, elements.style.value);
  addHistory("初始化传记用例", "代理生成", "", biography);
  localStorage.setItem(DEMO_KEY, "installed");
  persist();
}

function getActiveEvent() {
  return events.find((event) => event.id === activeId);
}

function readForm() {
  const existing = getActiveEvent();
  const now = new Date().toISOString();
  return {
    ...(existing || createDraftEvent()),
    id: activeId,
    title: elements.title.value.trim(),
    startDate: dateInputToIso(elements.startDate.value, existing?.startDate || now),
    endDate: dateInputToIso(elements.endDate.value, existing?.endDate || existing?.startDate || now),
    content: elements.content.value.trim(),
    importance: Number(elements.importance.value),
    importanceReason: elements.importanceReason.textContent,
    summary: elements.summary.value.trim(),
    tags: splitList(elements.tags.value),
    themes: splitList(elements.themes.value),
    relationNotes: elements.relations.value.trim(),
    updatedAt: now,
  };
}

function fillEditor(event) {
  elements.title.value = event.title;
  elements.startDate.value = toDateInputValue(event.startDate);
  elements.endDate.value = toDateInputValue(event.endDate || event.startDate);
  elements.content.value = event.content;
  elements.importance.value = event.importance;
  elements.importanceLabel.textContent = Number(event.importance).toFixed(1);
  elements.importanceReason.textContent = event.importanceReason || "代理会根据影响范围、转折程度和情绪强度给出建议。";
  elements.dateReason.textContent = event.dateReason || "如果正文里提到时间，“梳理传记”时会自动识别并填入。";
  elements.summary.value = event.summary;
  elements.tags.value = event.tags.join(", ");
  elements.themes.value = event.themes.join(", ");
  elements.relations.value = event.relationNotes || relationSummary(event);
  updateStats();
}

function analyzeEvent(event, corpus = events) {
  const datedEvent = inferDateFromText(event);
  const text = `${datedEvent.title}。${datedEvent.content}`;
  const sentences = text
    .replace(/\s+/g, "")
    .split(/[。！？!?]/)
    .map((item) => item.trim())
    .filter(Boolean);
  const summary = event.summary || sentences.slice(0, 2).join("。").slice(0, 140) || "这是一段尚待补充的经历。";
  const tags = unique([...event.tags, ...extractKeywords(text)]);
  const themes = unique([...event.themes, ...inferThemes(text)]);
  const importanceResult = scoreImportance(text, themes, event.importance);
  const relationIds = inferRelations({ ...datedEvent, tags, themes }, corpus);
  const relationNotes = buildRelationNotes(relationIds, corpus);

  return {
    ...datedEvent,
    summary,
    tags: tags.slice(0, 10),
    themes: themes.slice(0, 8),
    relationIds,
    relationNotes,
    importance: importanceResult.score,
    importanceReason: importanceResult.reason,
  };
}

function inferDateFromText(event) {
  const text = `${event.title} ${event.content}`;
  const currentYear = new Date().getFullYear();
  const fullDate = text.match(/(19\d{2}|20\d{2})[年./-]\s*(\d{1,2})[月./-]\s*(\d{1,2})/);
  const yearMonth = text.match(/(19\d{2}|20\d{2})[年./-]\s*(\d{1,2})月?/);
  const yearOnly = text.match(/(19\d{2}|20\d{2})年?/);
  const relative = [
    ["去年", currentYear - 1],
    ["前年", currentYear - 2],
    ["今年", currentYear],
  ].find(([word]) => text.includes(word));

  let startDate = event.startDate;
  let endDate = event.endDate;
  let reason = event.dateReason || "未从正文识别到明确日期，保留手动日期。";

  if (fullDate) {
    const [, year, month, day] = fullDate;
    startDate = new Date(Number(year), Number(month) - 1, Number(day), 12).toISOString();
    endDate = startDate;
    reason = `从正文识别到具体日期：${year}年${month}月${day}日。`;
  } else if (yearMonth) {
    const [, year, month] = yearMonth;
    startDate = new Date(Number(year), Number(month) - 1, 1, 12).toISOString();
    endDate = new Date(Number(year), Number(month), 0, 12).toISOString();
    reason = `从正文识别到月份：${year}年${month}月。`;
  } else if (yearOnly) {
    const [, year] = yearOnly;
    startDate = new Date(Number(year), 0, 1, 12).toISOString();
    endDate = new Date(Number(year), 11, 31, 12).toISOString();
    reason = `从正文识别到年份：${year}年。`;
  } else if (relative) {
    const [word, year] = relative;
    startDate = new Date(year, 0, 1, 12).toISOString();
    endDate = new Date(year, 11, 31, 12).toISOString();
    reason = `从正文识别到相对时间“${word}”，按 ${year} 年处理。`;
  }

  return { ...event, startDate, endDate, dateReason: reason };
}

function extractKeywords(text) {
  const dictionary = [
    "故乡",
    "父亲",
    "母亲",
    "家庭",
    "学校",
    "工作",
    "写作",
    "离开",
    "城市",
    "医院",
    "朋友",
    "爱情",
    "选择",
    "辞职",
    "成长",
    "迁徙",
    "孤独",
    "责任",
    "自由",
    "疾病",
    "夏天",
    "冬天",
  ];
  const found = dictionary.filter((word) => text.includes(word));
  const chunks = text.match(/[\u4e00-\u9fa5]{2,4}/g) || [];
  const frequent = chunks
    .filter((word) => !/[这个我们他们自己一种时候后来因为所以]/.test(word))
    .slice(0, 18);
  return unique([...found, ...frequent]).slice(0, 8);
}

function inferThemes(text) {
  const rules = [
    ["离别", ["离开", "送走", "远方", "故乡"]],
    ["成长", ["长大", "开始", "负责", "明白"]],
    ["家庭", ["父亲", "母亲", "家", "医院"]],
    ["职业选择", ["工作", "辞职", "公司", "负责"]],
    ["自我确认", ["自己", "自由", "写作", "内心"]],
    ["疾病与照护", ["住院", "病房", "医院", "撑住"]],
    ["迁徙", ["城市", "租房", "离开", "远方"]],
    ["记忆与写作", ["记忆", "写下", "写作", "理解"]],
  ];
  return rules.filter(([, words]) => words.some((word) => text.includes(word))).map(([theme]) => theme);
}

function scoreImportance(text, themes, currentScore) {
  const emotionalWords = ["第一次", "离开", "父亲", "母亲", "住院", "辞职", "重新", "明白", "改变", "失去", "选择", "长大"];
  let score = 3.5;
  score += Math.min(2.2, text.length / 260);
  score += Math.min(2, emotionalWords.filter((word) => text.includes(word)).length * 0.38);
  score += Math.min(1.2, themes.length * 0.22);
  score = Math.max(1, Math.min(10, Number((score * 0.72 + currentScore * 0.28).toFixed(1))));

  const reason = `代理建议 ${score.toFixed(1)}：依据事件长度、转折词、人物关系和主题密度综合估计；你可以手动调整。`;
  return { score, reason };
}

function inferRelations(event, corpus) {
  return corpus
    .filter((other) => other.id !== event.id)
    .map((other) => {
      const shared = [...event.tags, ...event.themes].filter((item) => [...other.tags, ...other.themes].includes(item));
      const timeGap = Math.abs(new Date(event.startDate) - new Date(other.startDate)) / (1000 * 60 * 60 * 24 * 365);
      const score = shared.length * 2 + Math.max(0, 2 - timeGap * 0.28);
      return { id: other.id, score };
    })
    .filter((item) => item.score > 1.2)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((item) => item.id);
}

function buildRelationNotes(ids, corpus) {
  if (!ids.length) return "暂无明显关联。";
  return ids
    .map((id) => corpus.find((event) => event.id === id))
    .filter(Boolean)
    .map((event) => `关联《${displayTitle(event)}》：共享主题或时间相近。`)
    .join("\n");
}

function relationSummary(event) {
  return event.relationNotes || buildRelationNotes(event.relationIds || [], events);
}

function saveEvent() {
  let event = readForm();
  if (!event.content) {
    setSaveState("先写下这段经历，再保存。");
    return;
  }

  const index = events.findIndex((item) => item.id === event.id);
  if (index >= 0) {
    events[index] = event;
  } else {
    events.push(event);
  }

  events.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  activeId = event.id;
  persist();
  renderAll();
  setSaveState("事件已保存。点击“梳理传记”后再统一分析。");
}

async function organizeBiography() {
  const current = readForm();
  if (current.content) {
    const index = events.findIndex((item) => item.id === current.id);
    if (index >= 0) events[index] = current;
    else events.push(current);
    activeId = current.id;
  }

  if (!events.length) {
    setSaveState("请先记录至少一段经历。");
    return;
  }

  setSaveState("正在梳理传记：索引、建图、章节规划与质量审查中...");
  const previous = biography;
  const remote = await callRemoteBiographyAgent(events, previous);

  if (remote && passesBiographyQuality(extractBiographyText(remote), events)) {
    applyRemoteOrganization(remote);
    addHistory("梳理传记：强模型生成章节草稿", "传记代理", previous, biography);
  } else {
    events = events.map((event) => analyzeEvent(event, events)).sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    rebuildRelations();
    biography = improveBiographyUntilAcceptable(generateBiography(events, elements.style.value, previous), events);
    addHistory("梳理传记：本地降级生成章节草稿", "本地代理", previous, biography);
  }

  persist();
  renderAll();
  setSaveState("传记已完成梳理。");
}

async function callRemoteBiographyAgent(sourceEvents, previous) {
  if (location.protocol === "file:") {
    return fetchWithTimeout("http://localhost:8787/api/organize", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        style: elements.style.value,
        events: sourceEvents,
        previousBiography: previous,
        model: "gpt-5.4-2026-03-05",
      }),
    }).catch(() => null);
  }

  return fetchWithTimeout("/api/organize", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      style: elements.style.value,
      events: sourceEvents,
      previousBiography: previous,
      model: "gpt-5.4-2026-03-05",
    }),
  }).catch(() => null);
}

async function fetchWithTimeout(url, options) {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 45000);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    if (!response.ok) return null;
    return await response.json();
  } finally {
    window.clearTimeout(timer);
  }
}

function applyRemoteOrganization(result) {
  if (Array.isArray(result.events)) {
    const byId = new Map(events.map((event) => [event.id, event]));
    events = result.events.map((event) => ({
      ...(byId.get(event.id) || createDraftEvent()),
      ...event,
      tags: Array.isArray(event.tags) ? event.tags : splitList(String(event.tags || "")),
      themes: Array.isArray(event.themes) ? event.themes : splitList(String(event.themes || "")),
      relationIds: Array.isArray(event.relationIds) ? event.relationIds : [],
      importance: Number(event.importance || 5),
    }));
  }

  biography = extractBiographyText(result) || biography;
  biographyChapters = Array.isArray(result.chapters)
    ? result.chapters.map((chapter) => ({
        title: chapter.title || "未命名章节",
        purpose: chapter.purpose || chapter.summary || "",
        events: (chapter.eventIds || [])
          .map((id) => events.find((event) => event.id === id))
          .filter(Boolean),
      }))
    : buildBiographyChapters(events);

  events.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
}

function extractBiographyText(result) {
  const value = result?.biography || result?.manuscript || "";
  if (typeof value !== "string") return String(value || "");
  const trimmed = value.trim();
  if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
    try {
      const parsed = JSON.parse(trimmed);
      if (typeof parsed.text === "string") return parsed.text;
    } catch {
      return value;
    }
  }
  return value;
}

function passesBiographyQuality(text, sourceEvents) {
  const audit = assessBiographyQuality(text, sourceEvents);
  return audit.score >= 82;
}

function assessBiographyQuality(text, sourceEvents) {
  const minLength = Math.max(1800, sourceEvents.length * 420);
  const hasBadDateRange = /\d{4}[/-]\d{1,2}[/-]\d{1,2}\s*(到|至|-)\s*\d{4}[/-]\d{1,2}[/-]\d{1,2}/.test(text);
  const numericDateCount = (text.match(/\d{4}年|\d{1,2}月|\d{4}[/-]\d{1,2}/g) || []).length;
  const hasChapters = /第[一二三四五六七八九十\d]+章|序章/.test(text);
  const imageCount = (text.match(/河|灯|雨|风|窗|病房|长椅|城市|夜|冬天|夏天|光|气味|声音/g) || []).length;
  const reflectionCount = (text.match(/后来|明白|意识到|以为|不是|而是|回头看|多年以后|理解自己/g) || []).length;
  const lengthScore = Math.min(30, (text.length / minLength) * 30);
  const structureScore = hasChapters ? 20 : 0;
  const imageScore = Math.min(20, imageCount * 2.5);
  const reflectionScore = Math.min(25, reflectionCount * 3);
  const penalty = (hasBadDateRange ? 35 : 0) + Math.max(0, numericDateCount - 2) * 8;
  return {
    score: Math.max(0, Math.round(lengthScore + structureScore + imageScore + reflectionScore + 5 - penalty)),
    minLength,
    actualLength: text.length,
    hasBadDateRange,
    numericDateCount,
    hasChapters,
    imageCount,
    reflectionCount,
  };
}

function improveBiographyUntilAcceptable(text, sourceEvents) {
  let improved = text;
  const audit = assessBiographyQuality(improved, sourceEvents);
  if (audit.score >= 82) return improved;

  const reflectiveCoda = sourceEvents
    .slice()
    .sort((a, b) => b.importance - a.importance)
    .slice(0, 3)
    .map((event) => {
      const image = extractImage(event.content) || "那一幕在记忆里留下了不肯散去的光。";
      return `\n\n回声：${displayTitle(event)}\n${image}多年以后再回望，我看见的已经不只是当时的困顿或喜悦，而是一个人如何在沉默里慢慢成形。那段经历没有给出明确的答案，却改变了我追问自己的方式：我从哪里来，愿意承担什么，又打算把什么留在身后。`;
    })
    .join("");

  improved += reflectiveCoda;
  return improved;
}

function deleteActiveEvent() {
  const event = getActiveEvent();
  if (!event) return;
  const confirmed = window.confirm(`要删除《${displayTitle(event)}》吗？这会触发传记修订。`);
  if (!confirmed) return;

  events = events.filter((item) => item.id !== event.id);
  activeId = events[0]?.id || createDraftEvent().id;
  const previous = biography;
  biography = generateBiography(events, elements.style.value, biography);
  addHistory(`删除事件：${displayTitle(event)}`, "传记代理", previous, biography);
  persist();
  renderAll();
}

function rebuildRelations() {
  events = events.map((event) => {
    const relationIds = inferRelations(event, events);
    return { ...event, relationIds, relationNotes: buildRelationNotes(relationIds, events) };
  });
}

function generateBiography(sourceEvents, styleKey, previous = "") {
  if (!sourceEvents.length) return "";
  const style = styleProfiles[styleKey] || styleProfiles.self;
  const chronological = [...sourceEvents].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  const chapters = buildBiographyChapters(chronological);
  biographyChapters = chapters;
  const memoryNote = previous.includes("【人工编辑记忆】")
    ? "\n\n【人工编辑记忆】已检测到用户曾直接编辑传记；后续代理修订应尽量保留用户表达，只补充事件结构和时间线。"
    : "";

  const body = chapters
    .map((chapter, chapterIndex) => {
      const eventTexts = chapter.events
        .map((event) => memoirParagraph(event, styleKey))
        .join("\n\n");
      return `第${chapterIndex + 1}章 ${chapter.title}\n${chapter.purpose}\n\n${eventTexts}`;
    })
    .join("\n\n");

  return `序章\n${style.opening} ${style.sentence}\n\n${body}${memoryNote}`;
}

function memoirParagraph(event, styleKey) {
  const period = naturalTimeLabel(event);
  const clean = event.content.replace(/\s+/g, "");
  const first = clean.split(/[。！？!?]/).filter(Boolean)[0] || event.summary || displayTitle(event);
  const turning = clean.split(/[。！？!?]/).filter((line) => /后来|第一次|忽然|终于|明白|意识到|不是|而是/.test(line)).slice(-1)[0];
  const image = extractImage(clean);
  const themeLine = event.themes.length ? `这件事后来被我放进“${event.themes.slice(0, 2).join("、")}”里。` : "";

  if (styleKey === "yuhua") {
    return `${period}，我记得${first}。${image}事情过去以后，我才知道生活有时并不解释自己，它只是把人往前推。${turning ? turning + "。" : ""}${themeLine}`;
  }
  if (styleKey === "marquez") {
    return `${period}，那段日子后来像一阵带着旧气味的风，反复回到我身边。${first}。${image}${turning ? turning + "。" : ""}${themeLine}`;
  }
  if (styleKey === "maugham") {
    return `${period}，回头看，${first}。当时我以为自己只是在处理一件具体的事，后来才看清它暴露了性格里的某种固执和软弱。${turning ? turning + "。" : ""}${themeLine}`;
  }
  if (styleKey === "kawabata") {
    return `${period}，记忆留下的不是完整的事实，而是一些微暗的光。${first}。${image}${turning ? turning + "。" : ""}${themeLine}`;
  }
  return `${period}，${first}。${image}${turning ? turning + "。" : ""}多年以后再看，它不只是一个事件，而是我理解自己的一条暗线。${themeLine}`;
}

function naturalTimeLabel(event) {
  const year = new Date(event.startDate).getFullYear();
  const nowYear = new Date().getFullYear();
  const titleAndContent = `${event.title}${event.content}`;
  if (/小时候|童年|很小/.test(titleAndContent)) return "小时候";
  if (/大学|宿舍|毕业/.test(titleAndContent)) return "读书那几年";
  if (/刚工作|租房|公司|辞职/.test(titleAndContent)) return "刚开始独自生活的时候";
  if (/母亲|父亲|医院|病房/.test(titleAndContent)) return "家里开始需要我撑住的时候";
  if (/写作|记忆|重新/.test(titleAndContent)) return "后来重新回望自己的时候";
  if (nowYear - year > 8) return "许多年前";
  if (nowYear - year > 3) return "几年前";
  return "后来有一段时间";
}

function extractImage(text) {
  const imageWords = ["河", "灯", "雨", "病房", "窗", "风", "长椅", "城市", "夜", "冬天", "夏天", "纸"];
  const hit = imageWords.find((word) => text.includes(word));
  if (!hit) return "";
  const sentence = text.split(/[。！？!?]/).find((line) => line.includes(hit));
  return sentence ? `${sentence}。` : "";
}

function buildBiographyChapters(sourceEvents) {
  const groups = [
    { title: "来处与早年的光", themes: ["家庭", "离别", "迁徙"], events: [] },
    { title: "独立、选择与世界的压力", themes: ["职业选择", "成长", "自我确认"], events: [] },
    { title: "亲密关系、责任与失去", themes: ["家庭", "疾病与照护"], events: [] },
    { title: "重新理解自己", themes: ["记忆与写作", "自我确认"], events: [] },
  ];

  sourceEvents.forEach((event) => {
    const matched = groups.find((group) => event.themes.some((theme) => group.themes.includes(theme)));
    (matched || groups[1]).events.push(event);
  });

  return groups
    .filter((group) => group.events.length)
    .map((group) => ({
      ...group,
      purpose: chapterPurpose(group),
    }));
}

function chapterPurpose(chapter) {
  const names = chapter.events.map((event) => `《${displayTitle(event)}》`).join("、");
  return `本章用于安放 ${names}，重点不是罗列事实，而是说明这些事件如何改变“我”看待家庭、世界与自己的方式。`;
}

function addHistory(action, author, before, after) {
  history.unshift({
    id: uid(),
    time: new Date().toISOString(),
    action,
    author,
    before,
    snapshot: after,
    diff: makeDiff(before || "", after || ""),
  });
  history = history.slice(0, 40);
}

function makeDiff(before, after) {
  const oldLines = before.split("\n").map((line) => line.trim()).filter(Boolean);
  const newLines = after.split("\n").map((line) => line.trim()).filter(Boolean);
  const oldSet = new Set(oldLines);
  const newSet = new Set(newLines);
  const added = newLines.filter((line) => !oldSet.has(line));
  const removed = oldLines.filter((line) => !newSet.has(line));
  const changed = Math.min(added.length, removed.length);
  return { added, removed, changed };
}

function saveBiographyEdit() {
  biography = elements.biography.value.trim();
  const memory = "\n\n【人工编辑记忆】用户直接修改过传记正文。代理后续重写时，应优先保持这些人工措辞、段落顺序和重点判断。";
  if (biography && !biography.includes("【人工编辑记忆】")) {
    biography += memory;
  }
  addHistory("记录用户人工编辑", "用户编辑", localStorage.getItem(BIO_KEY) || "", biography);
  persist();
  renderHistory();
  setSaveState("已记录人工编辑记忆。");
}

function undoVersion() {
  if (history.length < 2) {
    setSaveState("暂无可回退版本。");
    return;
  }
  const current = history.shift();
  const previous = history[0];
  biography = previous.snapshot;
  addHistory(`回退版本：撤销 ${current.action}`, "版本回退", current.snapshot, biography);
  persist();
  renderBiography();
  renderHistory();
}

function clearEditor() {
  const draft = createDraftEvent();
  activeId = draft.id;
  fillEditor(draft);
  setSaveState("新的经历卡片已创建。");
}

function renderAll() {
  renderEditor();
  renderFilteredEvents();
  renderIndex();
  renderBiography();
  renderOutline();
  renderChapters();
  renderHistory();
}

function renderEditor() {
  const event = getActiveEvent() || createDraftEvent();
  activeId = event.id;
  fillEditor(event);
}

function renderFilteredEvents() {
  const keyword = elements.search.value.trim().toLowerCase();
  filteredEvents = events.filter((event) => {
    const haystack = `${event.title} ${event.content} ${event.summary} ${event.tags.join(" ")} ${event.themes.join(" ")}`.toLowerCase();
    return haystack.includes(keyword);
  });
  elements.galaxyEmpty.textContent = keyword ? "没有找到匹配的经历。" : "还没有保存经历。";
  elements.galaxyEmpty.classList.toggle("visible", filteredEvents.length === 0);
  setDiaryGalaxyEntries(filteredEvents);
}

function renderIndex() {
  const sorted = [...events].sort((a, b) => b.importance - a.importance);
  elements.indexList.innerHTML = sorted
    .map(
      (event) => `
        <button class="index-item ${event.id === activeId ? "active" : ""}" data-id="${event.id}" type="button">
          <span>${event.themes[0]?.slice(0, 2) || "事"}</span>
          <strong>${displayTitle(event)}</strong>
          <small>${formatDate(event.startDate)} · ${event.summary || event.content.slice(0, 42)}</small>
          <em>${unique([...event.tags.slice(0, 4), ...event.themes.slice(0, 3)]).join(" / ") || "等待梳理"}</em>
        </button>
      `,
    )
    .join("");

  elements.indexList.querySelectorAll(".index-item").forEach((button) => {
    button.addEventListener("click", () => {
      activeId = button.dataset.id;
      renderAll();
    });
  });
}

function renderBiography() {
  elements.biography.value = biography;
}

function renderOutline() {
  const chapters = biographyChapters.length ? biographyChapters : buildBiographyChapters(events);
  elements.outline.innerHTML = chapters.length
    ? chapters
        .map(
          (chapter, index) => `
            <button class="outline-item" data-index="${index}" type="button">
              <strong>第${index + 1}章 ${chapter.title}</strong>
              <span>${chapter.events.length} 个事件 · ${chapter.events.map((event) => displayTitle(event)).join(" / ")}</span>
            </button>
          `,
        )
        .join("")
    : `<div class="empty-state">点击“梳理传记”后生成章节架构。</div>`;
}

function renderChapters() {
  const chapters = biographyChapters.length ? biographyChapters : buildBiographyChapters(events);
  elements.chapter.innerHTML = chapters.length
    ? chapters.map((chapter, index) => `<option value="${index}">第${index + 1}章 ${chapter.title}</option>`).join("")
    : `<option value="all">全文</option>`;
}

function renderHistory() {
  elements.historyList.innerHTML = history.length
    ? history
        .map(
          (item) => `
            <button class="history-item" data-id="${item.id}" type="button">
              <strong>${item.action}</strong>
              <span>${item.author} · ${formatDate(item.time, "full")}</span>
              <small>新增 ${item.diff?.added.length || 0} · 删除 ${item.diff?.removed.length || 0} · 修改 ${item.diff?.changed || 0}</small>
            </button>
          `,
        )
        .join("")
    : `<div class="empty-state">还没有修改记录。</div>`;

  elements.historyList.querySelectorAll(".history-item").forEach((button) => {
    button.addEventListener("click", () => {
      const item = history.find((version) => version.id === button.dataset.id);
      if (!item) return;
      biography = item.snapshot;
      renderBiography();
      setSaveState(`版本差异：新增 ${item.diff?.added.length || 0}，删除 ${item.diff?.removed.length || 0}，修改 ${item.diff?.changed || 0}。`);
    });
  });
}

function updateStats() {
  const count = elements.content.value.trim().replace(/\s/g, "").length;
  const event = getActiveEvent();
  elements.importanceLabel.textContent = Number(elements.importance.value).toFixed(1);
  elements.saveState.textContent = event ? `${count} 字 · ${events.length} 个经历节点` : `${count} 字 · 新经历`;
}

function setSaveState(message) {
  elements.saveState.textContent = message;
  window.clearTimeout(saveTimer);
  saveTimer = window.setTimeout(updateStats, 2600);
}

function bindEvents() {
  elements.save.addEventListener("click", saveEvent);
  elements.organize.addEventListener("click", organizeBiography);
  elements.remove.addEventListener("click", deleteActiveEvent);
  elements.create.addEventListener("click", clearEditor);
  elements.search.addEventListener("input", renderFilteredEvents);
  elements.searchToggle.addEventListener("click", () => toggleFold(elements.searchToggle, elements.searchPanel));
  elements.indexToggle.addEventListener("click", () => toggleFold(elements.indexToggle, elements.indexPanel));
  elements.saveBioEdit.addEventListener("click", saveBiographyEdit);
  elements.undo.addEventListener("click", undoVersion);
  elements.settings.addEventListener("click", toggleSettings);
  elements.exportText.addEventListener("click", exportBiographyText);
  elements.exportImage.addEventListener("click", exportCurrentChapterImage);
  elements.importance.addEventListener("input", updateStats);
  elements.detailToggle.addEventListener("click", toggleDetailPanel);

  [elements.title, elements.startDate, elements.endDate, elements.content, elements.summary, elements.tags, elements.themes, elements.relations].forEach((field) => {
    field.addEventListener("input", () => {
      updateStats();
      setSaveState("有未保存的传记材料。");
    });
  });

  elements.biography.addEventListener("input", () => {
    window.clearTimeout(elements.biography.editTimer);
    elements.biography.editTimer = window.setTimeout(() => {
      biography = elements.biography.value;
      persist();
    }, 600);
  });

  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
      event.preventDefault();
      saveEvent();
    }
  });
}

function toggleFold(button, panel) {
  const opening = panel.classList.contains("collapsed");
  panel.classList.toggle("collapsed", !opening);
  button.setAttribute("aria-expanded", String(opening));
}

function toggleDetailPanel() {
  const hiding = !elements.detailPanel.classList.contains("collapsed");
  elements.detailPanel.classList.toggle("collapsed", hiding);
  elements.detailToggle.setAttribute("aria-expanded", String(!hiding));
  elements.detailToggle.title = hiding ? "展开代理索引" : "收起代理索引";
  elements.detailToggle.querySelector(".sr-only").textContent = hiding ? "展开代理索引" : "收起代理索引";
}

function toggleSettings() {
  elements.settingsPanel.classList.toggle("collapsed");
}

function exportBiographyText() {
  const blob = new Blob([elements.biography.value], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "个人传记.txt";
  link.click();
  URL.revokeObjectURL(url);
}

function exportCurrentChapterImage() {
  const chapterIndex = Number(elements.chapter.value || 0);
  const chapter = biographyChapters[chapterIndex];
  const text = chapter ? extractChapterText(chapterIndex) : elements.biography.value;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const width = 1200;
  const padding = 86;
  const lines = wrapText(ctx, text, width - padding * 2);
  canvas.width = width;
  canvas.height = Math.max(720, padding * 2 + lines.length * 34);
  const gradient = ctx.createLinearGradient(0, 0, width, canvas.height);
  gradient.addColorStop(0, "#061126");
  gradient.addColorStop(1, "#02040d");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(141,242,255,0.12)";
  ctx.beginPath();
  ctx.arc(width - 180, 140, 220, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#eaf6ff";
  ctx.font = "30px 'Noto Serif SC', serif";
  lines.forEach((line, index) => {
    ctx.fillText(line, padding, padding + index * 34);
  });
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = `${chapter?.title || "个人传记"}.png`;
  link.click();
}

function extractChapterText(index) {
  const marker = `第${index + 1}章`;
  const nextMarker = `第${index + 2}章`;
  const text = elements.biography.value;
  const start = text.indexOf(marker);
  if (start < 0) return text;
  const end = text.indexOf(nextMarker, start + marker.length);
  return end < 0 ? text.slice(start) : text.slice(start, end);
}

function wrapText(ctx, text, maxWidth) {
  ctx.font = "30px 'Noto Serif SC', serif";
  const lines = [];
  text.split("\n").forEach((paragraph) => {
    let line = "";
    for (const char of paragraph) {
      const next = line + char;
      if (ctx.measureText(next).width > maxWidth && line) {
        lines.push(line);
        line = char;
      } else {
        line = next;
      }
    }
    lines.push(line || " ");
  });
  return lines;
}

const diaryGalaxy = {
  ctx: null,
  entries: [],
  nodes: [],
  dust: [],
  width: 0,
  height: 0,
  ratio: 1,
  hoverId: null,
};

function hashNumber(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function setDiaryGalaxyEntries(nextEntries) {
  diaryGalaxy.entries = nextEntries;
  layoutDiaryGalaxy();
}

function layoutDiaryGalaxy() {
  if (!diaryGalaxy.ctx || diaryGalaxy.width === 0) return;
  const centerX = diaryGalaxy.width / 2;
  const centerY = diaryGalaxy.height / 2;
  const maxRadius = Math.max(96, Math.min(diaryGalaxy.width, diaryGalaxy.height) * 0.38);
  const count = Math.max(diaryGalaxy.entries.length, 1);

  diaryGalaxy.nodes = diaryGalaxy.entries.map((event, index) => {
    const hash = hashNumber(event.id + displayTitle(event));
    const hue = 185 + ((hash + index * 47) % 170);
    const angle = index * 2.399963 + (hash % 90) * 0.01;
    const ring = 0.26 + (index / count) * 0.74;
    const radius = maxRadius * ring + (hash % 38) - 18;
    const targetX = centerX + Math.cos(angle) * radius;
    const targetY = centerY + Math.sin(angle) * radius * 0.78;
    const existing = diaryGalaxy.nodes.find((node) => node.id === event.id);
    const importanceRadius = 5 + Number(event.importance) * 1.55;

    return {
      id: event.id,
      event,
      x: existing?.x ?? targetX,
      y: existing?.y ?? targetY,
      targetX,
      targetY,
      radius: event.id === activeId ? importanceRadius * 1.22 : importanceRadius,
      breathSpeed: 0.001 + Number(event.importance) * 0.00028,
      pulse: (hash % 628) / 100,
      orbit: importanceRadius * 1.7 + (hash % 16),
      hue,
      glow: `hsla(${hue}, 96%, 66%, ALPHA)`,
      core: `hsla(${hue + 18}, 100%, 78%, 0.96)`,
    };
  });
}

function initDiaryGalaxy() {
  const canvas = elements.galaxyCanvas;
  const ctx = canvas.getContext("2d");
  diaryGalaxy.ctx = ctx;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    diaryGalaxy.ratio = Math.min(window.devicePixelRatio || 1, 2);
    diaryGalaxy.width = Math.max(320, rect.width);
    diaryGalaxy.height = Math.max(320, rect.height);
    canvas.width = Math.floor(diaryGalaxy.width * diaryGalaxy.ratio);
    canvas.height = Math.floor(diaryGalaxy.height * diaryGalaxy.ratio);
    ctx.setTransform(diaryGalaxy.ratio, 0, 0, diaryGalaxy.ratio, 0, 0);
    diaryGalaxy.dust = Array.from({ length: 72 }, () => ({
      x: Math.random() * diaryGalaxy.width,
      y: Math.random() * diaryGalaxy.height,
      size: 0.7 + Math.random() * 2,
      speed: 0.08 + Math.random() * 0.26,
      phase: Math.random() * Math.PI * 2,
    }));
    layoutDiaryGalaxy();
  }

  function pointerNode(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return diaryGalaxy.nodes.find((node) => Math.hypot(node.x - x, node.y - y) <= node.radius + 16);
  }

  canvas.addEventListener("mousemove", (event) => {
    const node = pointerNode(event);
    diaryGalaxy.hoverId = node?.id || null;
    canvas.style.cursor = node ? "pointer" : "crosshair";
  });
  canvas.addEventListener("mouseleave", () => {
    diaryGalaxy.hoverId = null;
  });
  canvas.addEventListener("click", (event) => {
    const node = pointerNode(event);
    if (!node) return;
    activeId = node.id;
    renderAll();
  });

  window.addEventListener("resize", resize);
  resize();
  animateDiaryGalaxy();
}

function drawGlowCircle(ctx, x, y, radius, color, alpha) {
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, color.replace("ALPHA", String(alpha)));
  gradient.addColorStop(0.48, color.replace("ALPHA", String(alpha * 0.28)));
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

function animateDiaryGalaxy(time = 0) {
  const { ctx, width, height, nodes, dust } = diaryGalaxy;
  if (!ctx) return;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "rgba(1, 8, 22, 0.22)";
  ctx.fillRect(0, 0, width, height);
  ctx.globalCompositeOperation = "lighter";

  dust.forEach((star) => {
    star.y += star.speed;
    star.x += Math.sin(time * 0.001 + star.phase) * 0.12;
    if (star.y > height + 8) star.y = -8;
    ctx.fillStyle = `rgba(220, 250, 255, ${0.18 + Math.sin(time * 0.004 + star.phase) * 0.16})`;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  });

  nodes.forEach((node, index) => {
    node.x += (node.targetX + Math.cos(time * 0.001 + node.pulse) * 10 - node.x) * 0.045;
    node.y += (node.targetY + Math.sin(time * 0.0012 + node.pulse) * 8 - node.y) * 0.045;

    const linkedIds = new Set(node.event.relationIds || []);
    for (let nextIndex = index + 1; nextIndex < nodes.length; nextIndex += 1) {
      const other = nodes[nextIndex];
      const related = linkedIds.has(other.id) || (other.event.relationIds || []).includes(node.id);
      const distance = Math.hypot(other.x - node.x, other.y - node.y);
      if (!related && distance > Math.min(width, height) * 0.44) continue;
      const strength = related ? 0.62 : Math.max(0, 0.22 - distance / 1200);
      const gradient = ctx.createLinearGradient(node.x, node.y, other.x, other.y);
      gradient.addColorStop(0, `hsla(${node.hue}, 96%, 66%, ${strength})`);
      gradient.addColorStop(1, `hsla(${other.hue}, 96%, 66%, ${strength})`);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = related ? 1.5 : 0.8;
      const middleX = (node.x + other.x) / 2 + Math.sin(time * 0.001 + index) * 18;
      const middleY = (node.y + other.y) / 2 + Math.cos(time * 0.001 + nextIndex) * 16;
      ctx.beginPath();
      ctx.moveTo(node.x, node.y);
      ctx.quadraticCurveTo(middleX, middleY, other.x, other.y);
      ctx.stroke();
    }
  });

  nodes.forEach((node) => {
    const active = node.id === activeId;
    const hovered = node.id === diaryGalaxy.hoverId;
    const pulse = 1 + Math.sin(time * node.breathSpeed + node.pulse) * (0.08 + node.event.importance * 0.012);
    const radius = node.radius * (active ? 1.15 : hovered ? 1.08 : 1) * pulse;
    drawGlowCircle(ctx, node.x, node.y, radius * 4.6, node.glow, active ? 0.42 : 0.2);
    ctx.strokeStyle = `hsla(${node.hue}, 96%, 75%, ${active ? 0.85 : 0.38})`;
    ctx.lineWidth = active ? 1.6 : 1;
    ctx.beginPath();
    ctx.ellipse(node.x, node.y, node.orbit, node.orbit * 0.42, time * 0.001 + node.pulse, 0, Math.PI * 2);
    ctx.stroke();

    const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius * 1.8);
    gradient.addColorStop(0, "rgba(255,255,255,0.98)");
    gradient.addColorStop(0.25, node.core);
    gradient.addColorStop(1, `hsla(${node.hue}, 96%, 45%, 0)`);
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(node.x, node.y, radius * 1.8, 0, Math.PI * 2);
    ctx.fill();

    if (active || hovered) {
      ctx.font = "700 13px 'Noto Serif SC', serif";
      ctx.fillStyle = "rgba(238, 252, 255, 0.94)";
      ctx.shadowColor = "rgba(0,0,0,0.8)";
      ctx.shadowBlur = 10;
      ctx.fillText(displayTitle(node.event).slice(0, 11), node.x + 18, node.y - 7);
      ctx.font = "11px 'Noto Serif SC', serif";
      ctx.fillStyle = "rgba(161, 205, 229, 0.88)";
      ctx.fillText(`${formatDate(node.event.startDate)} · ${node.event.themes[0] || "经历"}`, node.x + 18, node.y + 11);
      ctx.shadowBlur = 0;
    }
  });

  ctx.globalCompositeOperation = "source-over";
  window.requestAnimationFrame(animateDiaryGalaxy);
}

function initDynamicNebula() {
  const canvas = document.querySelector("#nebula-canvas");
  const ctx = canvas.getContext("2d");
  const clouds = [];
  const stars = [];
  let width = 0;
  let height = 0;
  let ratio = 1;

  function resize() {
    ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    clouds.length = 0;
    stars.length = 0;
    for (let i = 0; i < 16; i += 1) {
      clouds.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 180 + Math.random() * 360,
        speed: 0.0006 + Math.random() * 0.0016,
        phase: Math.random() * Math.PI * 2,
        hue: 188 + Math.random() * 42,
      });
    }
    for (let i = 0; i < Math.min(170, Math.floor((width * height) / 8500)); i += 1) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 0.45 + Math.random() * 1.8,
        speed: 0.08 + Math.random() * 0.35,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  function draw(time = 0) {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#02040d";
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = "lighter";
    clouds.forEach((cloud) => {
      const x = cloud.x + Math.cos(time * cloud.speed + cloud.phase) * 48;
      const y = cloud.y + Math.sin(time * cloud.speed + cloud.phase) * 38;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, cloud.radius);
      gradient.addColorStop(0, `hsla(${cloud.hue}, 100%, 70%, 0.11)`);
      gradient.addColorStop(0.5, `hsla(${cloud.hue + 28}, 100%, 48%, 0.045)`);
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, cloud.radius, 0, Math.PI * 2);
      ctx.fill();
    });
    stars.forEach((star) => {
      star.y += star.speed;
      if (star.y > height) star.y = 0;
      ctx.fillStyle = `rgba(225,248,255,${0.2 + Math.sin(time * 0.004 + star.phase) * 0.18})`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalCompositeOperation = "source-over";
    window.requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  draw();
}

function initWritingEffects() {
  const canvas = elements.writingEffects;
  const textarea = elements.content;
  const surface = canvas.parentElement;
  const ctx = canvas.getContext("2d");
  const particles = [];
  let width = 0;
  let height = 0;
  let ratio = 1;

  function resize() {
    const rect = surface.getBoundingClientRect();
    ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function emit(count = 3) {
    const x = 28 + Math.random() * Math.max(40, width - 56);
    const y = 34 + Math.random() * Math.max(40, height - 68);
    surface.style.setProperty("--spark-x", `${(x / width) * 100}%`);
    surface.style.setProperty("--spark-y", `${(y / height) * 100}%`);
    for (let i = 0; i < count; i += 1) {
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.65) * 0.9,
        size: 0.6 + Math.random() * 1.2,
        life: 0.58,
        hue: 185 + Math.random() * 110,
      });
    }
    if (particles.length > 80) particles.splice(0, particles.length - 80);
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = "lighter";
    particles.forEach((particle, index) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= 0.024;
      if (particle.life <= 0) {
        particles.splice(index, 1);
        return;
      }
      const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 7);
      gradient.addColorStop(0, `hsla(${particle.hue},100%,80%,${particle.life * 0.38})`);
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 7, 0, Math.PI * 2);
      ctx.fill();
    });
    window.requestAnimationFrame(draw);
  }

  textarea.addEventListener("input", () => emit(4));
  textarea.addEventListener("focus", () => emit(6));
  window.addEventListener("resize", resize);
  resize();
  draw();
}

function init() {
  seedDemoEvents();
  bindEvents();
  initDynamicNebula();
  initDiaryGalaxy();
  initWritingEffects();
  renderAll();
}

init();
