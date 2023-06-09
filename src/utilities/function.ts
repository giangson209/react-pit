export function withMobile<T = Element>(fn: React.MouseEventHandler<T>) {
  return (e: React.MouseEvent<T, MouseEvent>) => {
    if (innerWidth >= 768) return;
    e.preventDefault();
    return fn(e);
  };
}
