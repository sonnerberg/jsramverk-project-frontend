import {
  axisBottom,
  axisRight,
  curveCardinal,
  line,
  scaleLinear,
  select,
} from 'd3'
import React, { useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const Svg = styled.svg`
  display: block;
  width: 100%;
  margin-left: '1rem';
  overflow: visible;
`

const Div = styled.div`
  margin: 1rem;
  margin-right: 2.5rem;
  margin-bottom: 2.5rem;
  max-width: 500px;
`

const H2 = styled.h2`
  text-align: center;
  font-size: 1.1rem;
`

const useResizeObserver = (ref) => {
  const [dimensions, setDimensions] = useState(null)
  useLayoutEffect(() => {
    const observeTarget = ref.current
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setDimensions(entry.contentRect)
      })
    })
    resizeObserver.observe(observeTarget)
    return () => {
      resizeObserver.unobserve(observeTarget)
    }
  }, [ref])
  return dimensions
}

export const Graph = ({ stock, numberOfGraphPoints }) => {
  const svgRef = useRef()
  const wrapperRef = useRef()
  const values = stock.values.slice(-numberOfGraphPoints)
  const dimensions = useResizeObserver(wrapperRef)

  const xDomain = 10

  useLayoutEffect(() => {
    const svg = select(svgRef.current)

    if (!dimensions) return

    const xScale = scaleLinear()
      .domain([0, values.length < xDomain ? xDomain - 1 : values.length - 1])
      .range([0, dimensions.width]) // change

    const yScale = scaleLinear()
      .domain([Math.min(...values) - 10, Math.max(...values) + 10])
      .range([dimensions.height, 0]) // change

    const xAxis = axisBottom(xScale).ticks(5)
    // .tickFormat((index) => index + 1)
    svg
      .select('.x-axis')
      .style('transform', `translateY(${dimensions.height}px)`)
      .call(xAxis)

    const yAxis = axisRight(yScale).ticks(5)

    svg
      .select('.y-axis')
      .style('transform', `translateX(${dimensions.width}px)`)
      .call(yAxis)

    const myLine = line()
      .x((value, index) => xScale(index))
      .y(yScale)
      .curve(curveCardinal)

    svg
      .selectAll('.line')
      .data([values])
      .join('path')
      .attr('class', 'line')
      .attr('d', (value) => myLine(value))
      .attr('fill', 'none')
      .attr('stroke', 'blue')
  }, [values, dimensions])

  return (
    <>
      <Div ref={wrapperRef}>
        <H2>{stock.name}</H2>
        <Svg ref={svgRef}>
          <g className="x-axis" />
          <g className="y-axis" />
        </Svg>
      </Div>
    </>
  )
}
