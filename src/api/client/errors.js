export class ResourceError extends Error {
  code = 40000;
  message = 'Resource not found.';
}
