import { Terminal } from "lucide-react";

export const EditorPanelSkeleton = () => {
  return (
    <div className="relative">
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5
    rounded-xl blue-2xl"
      />

      <div className="relative bg-[#12121a]/90 backdrop-blur rounde-xl border border-white/[0.05] p-6 h-[600px]">
        <div className="relative rounded-xl overflow-hidden ring-1 ring-white/[0.05]">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />

          <div className="h-[600px] bg-[#1e1e2e]/50 backdrop-blur-sm p-4">
            {[...Array(15)].map((_, index) => (
              <div key={index} className="flex items-center gap-4 mb-3">
                <div className="w-12 h-4 bg-white rounded" />
                <div
                  className="h-4 bg-white/5 rounded"
                  style={{ width: `${Math.random() * 60 + 20}%` }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 flex justify-end">
          <div className="w-40 h-6 bg-white/5 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export const OutputPanelSkeleton = () => {
  return (
    <div className="relative bg-[#181825] rounde-xl p-4 ring-1 ring-gray-800/50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center size-6 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
            <Terminal className="size-4 text-blue-400/50" />
          </div>
          <div className="w-16 h-4 bg-white/5 rounded" />
        </div>
      </div>
    </div>
  );
};

export const EditorViewSkeleton = () => {
  return (
    <div className="space-y-6 p-4">
      <EditorPanelSkeleton />
      <OutputPanelSkeleton />
    </div>
  );
};
