"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Home, Plus, Compass, Download, Sparkles } from "lucide-react";

interface Server {
  id: string;
  name: string;
  icon?: string;
  notifications?: number;
  isActive?: boolean;
}

const servers: Server[] = [
  { id: "demand-os", name: "Demand OS Hub", icon: "/images/logo.png", notifications: 3 },
  { id: "suppliers", name: "Suppliers Network", notifications: 1 },
  { id: "tiktok", name: "TikTok Trends" },
];

interface ServerSidebarProps {
  activeServerId?: string;
  onServerChange?: (serverId: string) => void;
}

export default function ServerSidebar({ activeServerId = "demand-os", onServerChange }: ServerSidebarProps) {
  const [hoveredServer, setHoveredServer] = useState<string | null>(null);

  return (
    <nav className="w-[72px] bg-discord-server flex flex-col items-center py-3 gap-2 h-screen overflow-y-auto scrollbar-hide">
      {/* 1. 私信/主页入口 */}
      <ServerIcon 
        active={activeServerId === "home"}
        onClick={() => onServerChange?.("home")}
        tooltip="直达私信"
      >
        <Home className="w-5 h-5" />
      </ServerIcon>

      {/* 分割线 */}
      <div className="w-8 h-[2px] bg-discord-bg rounded-lg my-1" />

      {/* 2. 服务器列表 */}
      {servers.map((server) => (
        <ServerIcon
          key={server.id}
          img={server.icon}
          active={activeServerId === server.id}
          notification={server.notifications}
          tooltip={server.name}
          onClick={() => onServerChange?.(server.id)}
          onMouseEnter={() => setHoveredServer(server.id)}
          onMouseLeave={() => setHoveredServer(null)}
        >
          {!server.icon && (
            <span className="text-lg font-semibold">
              {server.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
            </span>
          )}
        </ServerIcon>
      ))}

      {/* 分割线 */}
      <div className="w-8 h-[2px] bg-discord-bg rounded-lg my-1" />

      {/* 3. 添加服务器 */}
      <ActionIcon tooltip="添加服务器" color="green">
        <Plus className="w-5 h-5" />
      </ActionIcon>

      {/* 4. 探索公开服务器 */}
      <ActionIcon tooltip="探索公开服务器" color="green">
        <Compass className="w-5 h-5" />
      </ActionIcon>

      {/* 分割线 */}
      <div className="w-8 h-[2px] bg-discord-bg rounded-lg my-1" />

      {/* 5. 下载应用 */}
      <ActionIcon tooltip="下载应用" color="green">
        <Download className="w-5 h-5" />
      </ActionIcon>
    </nav>
  );
}

// ==================== 子组件 ====================

interface ServerIconProps {
  children?: React.ReactNode;
  img?: string;
  active?: boolean;
  notification?: number;
  tooltip?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

function ServerIcon({ 
  children, 
  img, 
  active, 
  notification, 
  tooltip,
  onClick,
  onMouseEnter,
  onMouseLeave 
}: ServerIconProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative group w-full flex justify-center cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => { setIsHovered(true); onMouseEnter?.(); }}
      onMouseLeave={() => { setIsHovered(false); onMouseLeave?.(); }}
    >
      {/* 左侧白色指示条 (Pill) */}
      <motion.div 
        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 bg-white rounded-r-full"
        initial={false}
        animate={{
          height: active ? 40 : isHovered ? 20 : 8,
          opacity: active || isHovered ? 1 : 0
        }}
        transition={{ duration: 0.15 }}
      />
      
      {/* 图标本体 */}
      <motion.div 
        className={`w-12 h-12 overflow-hidden flex items-center justify-center transition-colors duration-200
          ${img ? '' : 'text-discord-text-normal'}
        `}
        initial={false}
        animate={{
          borderRadius: active || isHovered ? 16 : 24,
          backgroundColor: active ? "#5865F2" : isHovered ? "#5865F2" : "#313338"
        }}
        transition={{ duration: 0.15 }}
      >
        {img ? (
          <Image src={img} alt="" width={48} height={48} className="w-full h-full object-cover" />
        ) : children}
      </motion.div>

      {/* 通知红点 */}
      {notification && notification > 0 && (
        <div className="absolute bottom-0 right-1 w-5 h-5 bg-discord-red rounded-full flex items-center justify-center border-4 border-discord-server">
          <span className="text-[10px] font-bold text-white">{notification > 9 ? "9+" : notification}</span>
        </div>
      )}

      {/* Tooltip */}
      {tooltip && isHovered && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute left-full ml-4 top-1/2 -translate-y-1/2 z-50 px-3 py-2 bg-black rounded-md shadow-lg whitespace-nowrap"
        >
          <span className="text-sm font-semibold text-white">{tooltip}</span>
          {/* 小三角 */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-black rotate-45" />
        </motion.div>
      )}
    </div>
  );
}

interface ActionIconProps {
  children: React.ReactNode;
  tooltip?: string;
  color?: "green" | "blurple";
}

function ActionIcon({ children, tooltip, color = "green" }: ActionIconProps) {
  const [isHovered, setIsHovered] = useState(false);

  const hoverBg = color === "green" ? "#23A559" : "#5865F2";
  const hoverText = "white";
  const defaultText = color === "green" ? "#23A559" : "#5865F2";

  return (
    <div 
      className="relative group w-full flex justify-center cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="w-12 h-12 flex items-center justify-center transition-all duration-200"
        initial={false}
        animate={{
          borderRadius: isHovered ? 16 : 24,
          backgroundColor: isHovered ? hoverBg : "#313338",
          color: isHovered ? hoverText : defaultText
        }}
        transition={{ duration: 0.15 }}
      >
        {children}
      </motion.div>

      {/* Tooltip */}
      {tooltip && isHovered && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute left-full ml-4 top-1/2 -translate-y-1/2 z-50 px-3 py-2 bg-black rounded-md shadow-lg whitespace-nowrap"
        >
          <span className="text-sm font-semibold text-white">{tooltip}</span>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-black rotate-45" />
        </motion.div>
      )}
    </div>
  );
}
