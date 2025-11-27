import { Track } from "@/lib/mock-auth";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, GripVertical, Clock } from "lucide-react";

interface QueueListProps {
  queue: Track[];
  onRemove: (trackId: string) => void;
}

export function QueueList({ queue, onRemove }: QueueListProps) {
  if (queue.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
        <p>Queue is empty</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-2">
        {queue.map((track, index) => (
          <div 
            key={track.id}
            className="group flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 transition-all"
          >
            <div className="text-muted-foreground font-mono text-xs w-6 text-center">
              {index + 1}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-white truncate">{track.title}</h4>
              <p className="text-xs text-muted-foreground truncate">{track.artist} • Added by {track.requester}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
              </div>
              
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8 opacity-0 group-hover:opacity-100 hover:bg-destructive/20 hover:text-destructive transition-all"
                onClick={() => onRemove(track.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
