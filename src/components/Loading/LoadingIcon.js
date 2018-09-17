import React from 'react'

const SvgComponent = props => (
  <svg width={88} height={88} stroke="#fff" {...props}>
    <g fill="none" fillRule="evenodd" strokeWidth={2}>
      <circle cx={44} cy={44} r={1}>
        <animate
          attributeName="r"
          begin="0s"
          dur="1.8s"
          values="1; 40"
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.33, 1.68, 1.76, 1"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-opacity"
          begin="0s"
          dur="1.8s"
          values="1; 0"
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.6, 1.22, 0.71, 1"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx={44} cy={44} r={1}>
        <animate
          attributeName="r"
          begin="-0.9s"
          dur="1.8s"
          values="1; 40"
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.33, 1.68, 1.76, 1"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-opacity"
          begin="-0.9s"
          dur="1.8s"
          values="1; 0"
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.6, 1.22, 0.71, 1"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  </svg>
)

export default SvgComponent
