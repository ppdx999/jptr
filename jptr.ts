// deno-lint-ignore-file no-explicit-any

const _toJsonPointer = (data: any, ptrs: string[], prefix: string) => {
  if (data === null || data === undefined) return;
  if (typeof data !== "object") return;
  if (Array.isArray(data)) {
    data.map((d, i) => _toJsonPointer(d, ptrs, `${prefix}/${i}`));
    return;
  }

  for (const key of Object.keys(data)) {
    const value = data[key];
    if (typeof value === "object" && value !== null) {
      _toJsonPointer(value, ptrs, `${prefix}/${key}`);
    } else {
      ptrs.push(`${prefix}/${key}`);
    }
  }
};

export const toJsonPointer = (data: any) => {
  const ptrs: string[] = [];
  _toJsonPointer(data, ptrs, "");
  return ptrs;
};
