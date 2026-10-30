export function formatDate(date: string, locale = "en"): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString(
    locale === "zh-CN" ? "zh-CN" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    },
  );
}
export function readingTime(body = "", locale = "en"): string {
  const han = body.match(/\p{Script=Han}/gu)?.length ?? 0;
  const words = body
    .replace(/\p{Script=Han}/gu, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(han / 400 + words / 220));
  return locale === "zh-CN" ? `约 ${minutes} 分钟` : `${minutes} min read`;
}
