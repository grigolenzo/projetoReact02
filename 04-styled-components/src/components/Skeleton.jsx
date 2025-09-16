import React from 'react';
import styled, { keyframes } from 'styled-components';

const shine = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const Box = styled.div`
  background: ${(p) => p.theme.skeleton};
  position: relative;
  overflow: hidden;
`;

const Shimmer = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, ${(p) => p.theme.skeletonHighlight}, transparent);
  animation: ${shine} 1.6s linear infinite;
`;

export default function Skeleton({ style }){
  return <Box style={style} aria-hidden><Shimmer /></Box>;
}
