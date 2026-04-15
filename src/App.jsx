import React from "react";

export default function App() {
  const schools = [
    {
      school: "早稻田大学",
      faculty: "全学部",
      type: "私立",
      category: "全学部共通",
      area: "东京",
      start: "2026-06-01",
      end: "2026-06-18",
      predicted: false,
    },
    {
      school: "庆应义塾大学",
      faculty: "全学部",
      type: "私立",
      category: "全学部共通",
      area: "东京",
      start: "2025-10-15",
      end: "2025-10-29",
      predicted: true,
    },
    {
      school: "上智大学",
      faculty: "经济学部",
      type: "私立",
      category: "文科",
      area: "东京",
      start: "2026-10-03",
      end: "2026-10-12",
      predicted: true,
    },
    {
      school: "同志社大学",
      faculty: "商学部",
      type: "私立",
      category: "文科",
      area: "关西",
      start: "2026-10-15",
      end: "2026-10-25",
      predicted: true,
    },
    {
      school: "立命馆大学",
      faculty: "经营学部",
      type: "私立",
      category: "文科",
      area: "关西",
      start: "2026-10-20",
      end: "2026-10-30",
      predicted: true,
    },
    {
      school: "东京理科大学",
      faculty: "工学部",
      type: "私立",
      category: "理科",
      area: "东京",
      start: "2026-11-01",
      end: "2026-11-08",
      predicted: true,
    },
    {
      school: "京都工艺纤维大学",
      faculty: "工艺科学部",
      type: "国公立",
      category: "理科",
      area: "关西",
      start: "2026-11-12",
      end: "2026-11-18",
      predicted: false,
    },
    {
      school: "横滨国立大学",
      faculty: "经济学部",
      type: "国公立",
      category: "文科",
      area: "东京圈",
      start: "2026-11-20",
      end: "2026-11-28",
      predicted: true,
    },
  ];

  const today = new Date();
  const [search, setSearch] = React.useState("");
  const [type, setType] = React.useState("全部");
  const [category, setCategory] = React.useState("全部");
  const [area, setArea] = React.useState("全部");

  const dayDiff = (dateString) => {
    const target = new Date(dateString + "T00:00:00");
    const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const getStatus = (start, end) => {
    const startDiff = dayDiff(start);
    const endDiff = dayDiff(end);
    if (endDiff < 0) return { label: "已截止", tone: "bg-gray-100 text-gray-500" };
    if (startDiff <= 0 && endDiff >= 0) return { label: "出愿中", tone: "bg-red-100 text-red-600" };
    if (startDiff <= 14) return { label: "即将开始", tone: "bg-orange-100 text-orange-600" };
    return { label: `还有 ${startDiff} 天`, tone: "bg-blue-100 text-blue-600" };
  };

  const filtered = schools.filter((item) => {
    const textMatch = `${item.school}${item.faculty}`.toLowerCase().includes(search.toLowerCase());
    const typeMatch = type === "全部" || item.type === type;
    const categoryMatch = category === "全部" || item.category === category;
    const areaMatch = area === "全部" || item.area === area;
    return textMatch && typeMatch && categoryMatch && areaMatch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <div className="mb-6 grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-sm font-medium text-blue-600">日本留学出愿倒计时 MVP</p>
                <h1 className="text-2xl font-bold md:text-3xl">热门学校出愿时间一站式查看</h1>
                <p className="mt-3 text-sm leading-6 text-slate-600 md:text-base">
                  先做热门学校版本。看出愿时间、筛学校、判断节奏。后续可以继续加学校推荐和分数匹配功能。
                </p>
              </div>
              <div className="hidden rounded-2xl bg-slate-100 px-4 py-3 text-right md:block">
                <div className="text-xs text-slate-500">当前收录</div>
                <div className="text-2xl font-bold">{schools.length}</div>
                <div className="text-xs text-slate-500">所热门学校/学部</div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 p-6 text-white shadow-sm">
            <p className="text-sm opacity-90">转化入口</p>
            <h2 className="mt-2 text-xl font-bold">不知道自己该报什么？</h2>
            <p className="mt-3 text-sm leading-6 opacity-90">
              这个页面只能看时间。想看更适合你的学校区间、冲稳保建议、备考路径，可以找我做进一步判断。
            </p>
            <div className="mt-5 space-y-2 text-sm">
              <div className="rounded-2xl bg-white/15 px-4 py-3">① 私信关键词：出愿规划</div>
              <div className="rounded-2xl bg-white/15 px-4 py-3">② 留下分数 / 目标 / 当前阶段</div>
              <div className="rounded-2xl bg-white/15 px-4 py-3">③ 获取更适合你的申请建议</div>
            </div>
          </div>
        </div>

        <div className="mb-6 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 md:p-5">
          <div className="grid gap-3 md:grid-cols-4">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索学校或学部"
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
            />
            <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none">
              <option>全部</option>
              <option>国公立</option>
              <option>私立</option>
            </select>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none">
              <option>全部</option>
              <option>文科</option>
              <option>理科</option>
            </select>
            <select value={area} onChange={(e) => setArea(e.target.value)} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none">
              <option>全部</option>
              <option>东京</option>
              <option>东京圈</option>
              <option>关西</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item, idx) => {
            const status = getStatus(item.start, item.end);
            const diff = dayDiff(item.start);
            return (
              <div key={idx} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold">{item.school}</h3>
                    <p className="mt-1 text-sm text-slate-600">{item.faculty}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${status.tone}`}>{status.label}</span>
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${item.predicted ? "bg-slate-100 text-slate-600" : "bg-emerald-100 text-emerald-600"}`}>
                      {item.predicted ? "预测" : "已更新"}
                    </span>
                  </div>
                </div>

                <div className="mb-4 grid grid-cols-3 gap-2 text-sm">
                  <div className="rounded-2xl bg-slate-50 px-3 py-3 text-center">
                    <div className="text-xs text-slate-500">类型</div>
                    <div className="mt-1 font-semibold">{item.type}</div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 px-3 py-3 text-center">
                    <div className="text-xs text-slate-500">方向</div>
                    <div className="mt-1 font-semibold">{item.category}</div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 px-3 py-3 text-center">
                    <div className="text-xs text-slate-500">地区</div>
                    <div className="mt-1 font-semibold">{item.area}</div>
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">出愿开始</span>
                    <span className="font-semibold">{item.start}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-slate-500">出愿截止</span>
                    <span className="font-semibold">{item.end}</span>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-blue-600"
                      style={{ width: `${Math.max(8, Math.min(100, 100 - diff))}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="mt-10 rounded-3xl bg-white p-10 text-center text-slate-500 shadow-sm ring-1 ring-slate-200">
            没有找到符合条件的学校，可以换个关键词试试看。
          </div>
        )}

        <div className="mt-8 rounded-3xl border border-dashed border-blue-300 bg-blue-50 p-6">
          <h3 className="text-lg font-bold text-blue-900">下一步可以继续加什么</h3>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-4 text-sm text-slate-700">根据 EJU 分数推荐可报学校</div>
            <div className="rounded-2xl bg-white p-4 text-sm text-slate-700">冲 / 稳 / 保分层建议</div>
            <div className="rounded-2xl bg-white p-4 text-sm text-slate-700">表单收集信息，自动导流到咨询</div>
          </div>
        </div>
      </div>
    </div>
  );
}
