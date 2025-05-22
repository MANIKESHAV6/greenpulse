import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Award, Target, Leaf, Zap } from 'lucide-react';
import { Achievement } from '@/types/profile';
import { motion } from 'framer-motion';

interface AchievementsCardProps {
  achievements: Achievement[];
}

const iconMap: { [key: string]: React.ReactNode } = {
  trophy: <Trophy className="w-6 h-6 text-yellow-500" />,
  award: <Award className="w-6 h-6 text-blue-500" />,
  target: <Target className="w-6 h-6 text-red-500" />,
  leaf: <Leaf className="w-6 h-6 text-green-500" />,
  zap: <Zap className="w-6 h-6 text-purple-500" />,
};

export const AchievementsCard: React.FC<AchievementsCardProps> = ({ achievements }) => {
  return (
    <Card className="bg-card dark:bg-card-dark">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          Achievements
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4 p-4 bg-background dark:bg-background-dark rounded-lg"
          >
            <div className="flex-shrink-0">
              {iconMap[achievement.icon] || <Award className="w-6 h-6 text-blue-500" />}
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{achievement.title}</h3>
                <span className="text-sm text-muted-foreground">
                  {achievement.progress}%
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                {achievement.description}
              </p>
              <Progress value={achievement.progress} className="h-2" />
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}; 