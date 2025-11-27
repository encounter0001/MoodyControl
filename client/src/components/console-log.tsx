import { ScrollArea } from "@/components/ui/scroll-area";
import { Terminal } from "lucide-react";
import { useEffect, useRef } from "react";

interface ConsoleLogProps {
  logs: string[];
}

export function ConsoleLog({ logs }: ConsoleLogProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div className="bg-black/80 border border-white/10 rounded-lg overflow-hidden font-mono text-xs h-full flex flex-col">
      <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border-b border-white/5 text-muted-foreground">
        <Terminal className="w-3 h-3" />
        <span>Bot Terminal</span>
      </div>
      <ScrollArea className="flex-1 p-4 h-[200px]">
        <div className="space-y-1">
          {logs.map((log, i) => (
            <div key={i} className="text-green-400/80 break-all">
              <span className="text-white/30 mr-2">$</span>
              {log}
            </div>
          ))}
          <div ref={endRef} />
        </div>
      </ScrollArea>
    </div>
  );
}
