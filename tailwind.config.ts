
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'], // Body & UI labels
				heading: ['Poppins', 'sans-serif'], // Headlines
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				'section-background': 'hsl(var(--section-background))',
				primary: {
					DEFAULT: 'hsl(var(--primary))', // Battery Green
					foreground: 'hsl(var(--primary-foreground))',
					dark: 'hsl(var(--primary-dark))', // Battery Green-Dark for hover
					glow: 'hsl(var(--primary-glow))'
				},
				'trust-blue': {
					DEFAULT: 'hsl(var(--trust-blue))',
					foreground: 'hsl(var(--trust-blue-foreground))'
				},
				'energy-yellow': {
					DEFAULT: 'hsl(var(--energy-yellow))',
					foreground: 'hsl(var(--energy-yellow-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				brand: {
					volta: 'hsl(var(--brand-volta))',
					osaka: 'hsl(var(--brand-osaka))',
					fujika: 'hsl(var(--brand-fujika))',
					saga: 'hsl(var(--brand-saga))'
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))'
				},
				info: {
					DEFAULT: 'hsl(var(--info))',
					foreground: 'hsl(var(--info-foreground))'
				}
			},
			fontSize: {
				// Typography Stack as per guidelines
				'page-title': ['32px', { lineHeight: '1.2', fontWeight: '700' }], // 32px Poppins Bold
				'section-title': ['28px', { lineHeight: '1.2', fontWeight: '600' }], // 28px Poppins SemiBold
				'card-title': ['24px', { lineHeight: '1.2', fontWeight: '600' }], // 24px Poppins SemiBold
				'body': ['16px', { lineHeight: '1.5', fontWeight: '400' }], // 16px Inter Regular
				'small': ['14px', { lineHeight: '1.4', fontWeight: '400' }], // 14px Inter Regular
				'caption': ['12px', { lineHeight: '1.3', fontWeight: '500' }], // 12px Inter Medium
			},
			spacing: {
				// 8px base unit system
				'unit': '8px',
				'component': '24px', // Standard component padding
				'card': '24px', // Card internal padding
				'touch': '44px', // Minimum touch target size
			},
			maxWidth: {
				'content': '1240px', // Maximum content width on desktop
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-hero': 'var(--gradient-hero)',
				'gradient-card': 'var(--gradient-card)',
			},
			boxShadow: {
				'elegant': 'var(--shadow-elegant)',
				'glow': 'var(--shadow-glow)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					from: {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					to: {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					from: {
						opacity: '0',
						transform: 'scale(0.95)'
					},
					to: {
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				'slide-up': {
					from: {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					to: {
						opacity: '1',
						transform: 'translateY(0)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'slide-up': 'slide-up 0.4s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
