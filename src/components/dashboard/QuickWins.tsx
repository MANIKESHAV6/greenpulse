
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TipItem } from "@/types";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Lightbulb } from "lucide-react";

interface QuickWinsProps {
  quickWinTips: TipItem[];
}

const QuickWins: React.FC<QuickWinsProps> = ({ quickWinTips }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Quick Wins</h2>
      <Carousel
        opts={{
          align: "start",
          loop: true
        }}
        className="w-full"
      >
        <CarouselContent>
          {quickWinTips.slice(0, 5).map((tip, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Card className="border-l-4 border-l-green-500 h-full">
                <CardContent className="p-4 flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <p className="text-sm">{tip.tip}</p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </div>
  );
};

export default QuickWins;
