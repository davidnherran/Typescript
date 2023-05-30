export const getLSRoute = (route: string): string => {
  const routes = JSON.parse(localStorage.getItem("routes"));
  const path = window.location.href.split("/");
  const direction = `${path[0]}//${path[2]}/${routes[route]}`;

  if (direction[direction.length - 1] === "/") return direction.slice(0, -1);

  return direction;
};

export const getParamId = (): string => {
  const path = window.location.href.split("/");
  return path[path.length - 1];
};
