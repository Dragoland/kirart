export async function api<T = unknown>(path: string, init: RequestInit = {}): Promise<T> {
  const isForm = init.body instanceof FormData;
  const res = await fetch(`/api${path}`, {
    credentials: 'same-origin',
    ...init,
    headers: { ...(init.body && !isForm ? { 'Content-Type': 'application/json' } : {}), ...init.headers },
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error((data as { error?: string } | null)?.error || `Error ${res.status}`);
  if (data === null) throw new Error('Respuesta inválida del servidor');
  return data as T;
}

// Reduce fotos pesadas (móvil/cámara) a WebP de máx. 2000 px antes de subirlas
export async function compressImage(file: File, maxSide = 2000): Promise<File> {
  if (!file.type.startsWith('image/') || file.type === 'image/gif') return file;
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, maxSide / Math.max(bmp.width, bmp.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    canvas.getContext('2d')!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, 'image/webp', 0.88));
    if (!blob || (scale === 1 && blob.size >= file.size)) return file;
    return new File([blob], file.name.replace(/\.\w+$/, '') + '.webp', { type: 'image/webp' });
  } catch {
    return file;
  }
}

export async function uploadImage(file: File): Promise<string> {
  const form = new FormData();
  form.append('file', await compressImage(file));
  const { url } = await api<{ url: string }>('/upload', { method: 'POST', body: form });
  return url;
}
