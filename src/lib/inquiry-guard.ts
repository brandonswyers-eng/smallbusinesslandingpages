const MIN_FILL_MS = 3_000;
const MAX_FILL_MS = 1000 * 60 * 60 * 12;
const RATE_WINDOW_MS = 1000 * 60 * 30;
const RATE_MAX = 5;

const hitsByIp = new Map<string, number[]>();

function silentOk() {
  return { ok: true as const, silent: true as const };
}

export function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

export function checkInquiryBot(input: {
  website: string;
  startedAt: number;
  ip: string;
}): { ok: true; silent?: true } | { ok: false; status: number; error: string } {
  if (input.website.trim()) {
    return silentOk();
  }

  if (!Number.isFinite(input.startedAt)) {
    return silentOk();
  }

  const elapsed = Date.now() - input.startedAt;
  if (elapsed < MIN_FILL_MS || elapsed > MAX_FILL_MS) {
    return silentOk();
  }

  const now = Date.now();
  const recent = (hitsByIp.get(input.ip) ?? []).filter(
    (time) => now - time < RATE_WINDOW_MS,
  );
  if (recent.length >= RATE_MAX) {
    return {
      ok: false,
      status: 429,
      error: "Please wait a bit before sending another inquiry.",
    };
  }
  recent.push(now);
  hitsByIp.set(input.ip, recent);

  return { ok: true };
}
