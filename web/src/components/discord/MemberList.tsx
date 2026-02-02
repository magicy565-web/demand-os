/**
 * MemberList - Discord 成员列表组件
 * 可复用的右侧成员列表
 */

"use client";

import { motion, AnimatePresence } from "framer-motion";

interface Member {
  name: string;
  status: "online" | "idle" | "dnd" | "offline";
  isBot?: boolean;
  role?: string;
  avatar?: string;
}

interface MemberListProps {
  showList: boolean;
}

// 在线成员数据
const onlineMembers: Member[] = [
  { name: "Demand-OS Bot", status: "online", isBot: true, role: "AI Assistant" },
  { name: "Admin", status: "online", role: "Owner" },
  { name: "Sarah Chen", status: "online", role: "Moderator" },
  { name: "DropshipKing_99", status: "online" },
  { name: "GlobalSourcer", status: "online" },
  { name: "Mike Liu", status: "online" },
  { name: "Emma Wang", status: "online" },
  { name: "Alex Thompson", status: "online" },
  { name: "Jennifer Wu", status: "idle" },
  { name: "David Kim", status: "idle" },
  { name: "Lisa Wang", status: "idle" },
  { name: "James Chen", status: "online" },
  { name: "Michael Brown", status: "online" },
  { name: "Rachel Green", status: "idle" },
  { name: "Kevin Zhang", status: "online" },
  { name: "Amanda Lee", status: "dnd" },
  { name: "Chris Park", status: "online" },
  { name: "Diana Martinez", status: "online" },
  { name: "Eric Johnson", status: "idle" },
  { name: "Fiona Liu", status: "online" },
];

// 离线成员数据  
const offlineMembers: Member[] = [
  { name: "NewUser123", status: "offline" },
  { name: "Viewer_001", status: "offline" },
  { name: "TradeMaster", status: "offline" },
  { name: "SupplyChainPro", status: "offline" },
  { name: "ImportExpert", status: "offline" },
  { name: "DealHunter88", status: "offline" },
  { name: "QualityFirst", status: "offline" },
  { name: "BulkBuyerJohn", status: "offline" },
  { name: "EcomSeller", status: "offline" },
  { name: "FactoryFinder", status: "offline" },
  { name: "WholesaleKing", status: "offline" },
  { name: "SourceMaster", status: "offline" },
];

export default function MemberList({ showList }: MemberListProps) {
  if (!showList) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 240, opacity: 1 }}
        exit={{ width: 0, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-discord-sidebar border-l border-black/20 overflow-hidden shrink-0"
      >
        <div className="p-4 overflow-y-auto h-full">
          {/* 在线成员 */}
          <div className="mb-4">
            <h4 className="text-xs font-bold text-discord-text-muted uppercase mb-2 px-2">
              ONLINE — {onlineMembers.length}
            </h4>
            {onlineMembers.map((member, i) => (
              <MemberItem key={i} member={member} />
            ))}
          </div>

          {/* 离线成员 */}
          <div>
            <h4 className="text-xs font-bold text-discord-text-muted uppercase mb-2 px-2">
              OFFLINE — {offlineMembers.length}
            </h4>
            {offlineMembers.map((member, i) => (
              <MemberItem key={i} member={member} />
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function MemberItem({ member }: { member: Member }) {
  const statusColors: Record<string, string> = {
    online: "bg-discord-green",
    idle: "bg-discord-yellow",
    dnd: "bg-discord-red",
    offline: "bg-gray-500",
  };

  // 为不同用户生成不同的头像颜色
  const avatarColors = [
    "bg-discord-blurple",
    "bg-green-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-cyan-500",
  ];
  const colorIndex = member.name.charCodeAt(0) % avatarColors.length;
  const avatarColor = member.isBot ? "bg-discord-blurple" : avatarColors[colorIndex];

  return (
    <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-discord-hover cursor-pointer mb-0.5 group">
      <div className="relative">
        <div 
          className={`w-8 h-8 rounded-full ${avatarColor} flex items-center justify-center text-white text-sm font-bold ${
            member.status === "offline" ? "opacity-50" : ""
          }`}
        >
          {member.name[0].toUpperCase()}
        </div>
        <div 
          className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${statusColors[member.status]} rounded-full border-2 border-discord-sidebar`} 
        />
      </div>
      <div className="flex-1 min-w-0">
        <div 
          className={`text-sm font-medium truncate flex items-center gap-1 ${
            member.status === "offline" ? "text-discord-text-muted" : "text-discord-text-normal"
          }`}
        >
          {member.name}
          {member.isBot && (
            <span className="bg-discord-blurple text-white text-[9px] px-1 rounded font-medium">
              BOT
            </span>
          )}
        </div>
        {member.role && (
          <div className="text-[10px] text-discord-text-muted truncate">{member.role}</div>
        )}
      </div>
    </div>
  );
}

// 导出成员数据供其他组件使用
export { onlineMembers, offlineMembers };
export type { Member };
