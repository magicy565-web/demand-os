import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", "class"],
  theme: {
  	extend: {
  		colors: {
  			'cyber-bg': '#020617',
  			'cyber-glass': 'rgba(2, 6, 23, 0.6)',
  			'neon-primary': '#00ff9d',
  			'neon-secondary': '#00f3ff',
  			'neon-alert': '#ff0055',
  			'neon-purple': '#a855f7',
  			'neon-yellow': '#fbbf24',
  			'corp-bg': '#f8fafc',
  			'corp-surface': '#ffffff',
  			'corp-border': '#e2e8f0',
  			'corp-text-main': '#0f172a',
  			'corp-text-sub': '#64748b',
  			'corp-accent': '#2563eb',
  			'corp-success': '#16a34a',
  			'corp-warning': '#d97706',
  			'corp-danger': '#dc2626',
  			profit: '#22c55e',
  			loss: '#ef4444',
  			neutral: '#6b7280',
  			discord: {
  				bg: '#313338',
  				sidebar: '#2B2D31',
  				server: '#1E1F22',
  				hover: '#3F4147',
  				active: '#404249',
  				blurple: '#5865F2',
  				green: '#23A559',
  				red: '#DA373C',
  				yellow: '#F0B232',
  				input: '#383A40',
  				mention: 'rgba(88, 101, 242, 0.3)',
  				text: {
  					normal: '#DBDEE1',
  					muted: '#949BA4',
  					header: '#F2F3F5',
  					link: '#00AFF4'
  				}
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'Inter',
  				'system-ui',
  				'-apple-system',
  				'sans-serif'
  			],
  			mono: [
  				'JetBrains Mono',
  				'Menlo',
  				'monospace'
  			],
  			display: [
  				'Orbitron',
  				'Inter',
  				'system-ui',
  				'sans-serif'
  			],
  			cyber: [
  				'Orbitron',
  				'monospace'
  			]
  		},
  		animation: {
  			'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
  			'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
  			'fade-in': 'fade-in 0.3s ease-out',
  			'slide-up': 'slide-up 0.3s ease-out',
  			'glow': 'glow 2s ease-in-out infinite alternate',
  			'scan-line': 'scan-line 4s linear infinite',
  			'float': 'float 6s ease-in-out infinite'
  		},
  		keyframes: {
  			'pulse-slow': {
  				'0%, 100%': {
  					opacity: '1',
  					boxShadow: '0 0 20px rgba(0, 255, 157, 0.3)'
  				},
  				'50%': {
  					opacity: '0.8',
  					boxShadow: '0 0 40px rgba(0, 255, 157, 0.5)'
  				}
  			},
  			'pulse-subtle': {
  				'0%, 100%': {
  					opacity: '1'
  				},
  				'50%': {
  					opacity: '0.7'
  				}
  			},
  			'fade-in': {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			'slide-up': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(10px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			'glow': {
  				'from': {
  					textShadow: '0 0 10px #00ff9d, 0 0 20px #00ff9d'
  				},
  				'to': {
  					textShadow: '0 0 20px #00ff9d, 0 0 40px #00ff9d'
  				}
  			},
  			'scan-line': {
  				'0%': {
  					transform: 'translateY(-100%)'
  				},
  				'100%': {
  					transform: 'translateY(100vh)'
  				}
  			},
  			'float': {
  				'0%, 100%': {
  					transform: 'translateY(0)'
  				},
  				'50%': {
  					transform: 'translateY(-20px)'
  				}
  			}
  		},
  		boxShadow: {
  			'card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  			'card-hover': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  			'panel': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  			'neon': '0 0 20px rgba(0, 255, 157, 0.4)',
  			'neon-strong': '0 0 30px rgba(0, 255, 157, 0.6), 0 0 60px rgba(0, 255, 157, 0.3)',
  			'cyber': '0 0 40px rgba(0, 243, 255, 0.3)'
  		},
  		backdropBlur: {
  			xs: '2px'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
