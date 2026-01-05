import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, G, Rect } from 'react-native-svg';

interface BrandLogoProps {
    size?: number;
    color?: string;
}

export default function BrandLogo({ size = 64, color = "white" }: BrandLogoProps) {
    return (
        <View style={{ width: size, height: size }}>
            <Svg viewBox="0 0 100 100" width={size} height={size}>
                {/* Bulb Body */}
                <Path
                    d="M30 20 H70 Q75 20 75 25 V55 Q75 60 65 65 V80 Q65 85 60 85 H40 Q35 85 35 80 V65 Q25 60 25 55 V25 Q25 20 30 20 Z"
                    fill="none"
                    stroke={color}
                    strokeWidth="3"
                />

                {/* Central Slash */}
                <Path
                    d="M10 10 L90 90"
                    stroke={color}
                    strokeWidth="3"
                />

                {/* Binary/Technical Traces */}
                <G stroke={color} strokeWidth="2">
                    {/* Left Traces */}
                    <Path d="M15 55 H25" />
                    <Path d="M15 65 H25" />
                    {/* Right Traces */}
                    <Path d="M75 55 H85" />
                    <Path d="M75 65 H85" />

                    {/* Small Nodes */}
                    <Rect x="12" y="53" width="3" height="3" fill={color} />
                    <Rect x="12" y="63" width="3" height="3" fill={color} />
                    <Rect x="85" y="53" width="3" height="3" fill={color} />
                    <Rect x="85" y="63" width="3" height="3" fill={color} />
                </G>

                {/* Inner Detail */}
                <Path
                    d="M50 35 V45"
                    stroke={color}
                    strokeWidth="3"
                    strokeLinecap="round"
                />
                <G fill={color}>
                    <Rect x="48" y="28" width="4" height="4" rx="2" />
                </G>
            </Svg>
        </View>
    );
}
