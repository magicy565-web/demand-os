export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="loader-cyber" />
      <p className="text-sm text-gray-500 font-mono animate-pulse">
        正在加载数据流...
      </p>
    </div>
  );
}
