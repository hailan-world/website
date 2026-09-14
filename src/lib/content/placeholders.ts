/** Content is now owner-approved for publication; keep legacy call sites neutral. */
export function placeholderContent<T>(value: T, _locale?: string): T {
  void _locale;
  return value;
}

export function placeholderLabel(_locale?: string): string {
  void _locale;
  return "";
}
