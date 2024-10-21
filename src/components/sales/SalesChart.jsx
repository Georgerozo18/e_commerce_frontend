import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import '../../styles/components/sales/SalesChart.css'

export const SalesChart = ({ data }) => {
    const ref = useRef()

    useEffect(() => {
        // Limpiar cualquier gráfico existente
        d3.select(ref.current).selectAll("*").remove()

        const margin = { top: 80, right: 20, bottom: 50, left: 60 }
        const width = 600 - margin.left - margin.right
        const height = 400 - margin.top - margin.bottom

        const svg = d3.select(ref.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`)

        // Configuración de escalas
        const xScale = d3.scaleBand()
            .domain(data.map(d => d.date))
            .range([0, width])
            .padding(0.5)

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.totalSales)])
            .nice()
            .range([height, 0])

        const revenueScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.totalRevenue) / 100])
            .nice()
            .range([height, 0])

        // Añadir ejes
        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(xScale))
            .selectAll("text")
            .attr("transform", "rotate(0)")
            .attr("font-size", "1.4em")
            .style("text-anchor", "middle")

        svg.append("g")
            .call(d3.axisLeft(yScale)
                .ticks(d3.max(data, d => d.totalSales))
                .tickFormat(d3.format('d')))
            .selectAll("text")
            .style("font-size", "1.5em")
            .attr("fill", "aliceblue")

        // Añadir las barras
        svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", d => xScale(d.date))
            .attr("y", d => yScale(d.totalSales))
            .attr("width", xScale.bandwidth())
            .attr("height", d => height - yScale(d.totalSales))
            .attr("fill", "aliceblue")
            .attr("rx", 5)
            .attr("ry", 5)

        // Añadir línea de totalRevenue escalada
        const line = d3.line()
            .curve(d3.curveBasis) // Línea suave curveBasis || curveLinear
            .x((d, i) => xScale(d.date) + xScale.bandwidth() / 2)
            .y(d => revenueScale(d.totalRevenue / 100))

        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#66166a")
            .attr("stroke-width", 3)
            .attr("d", line)

        // Añadir puntos en la línea para el tooltip
        svg.selectAll(".point")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", "point")
            .attr("cx", (d) => xScale(d.date) + xScale.bandwidth() / 2)
            .attr("cy", (d) => revenueScale(d.totalRevenue / 100)) // Usar revenueScale aquí
            .attr("r", 5)
            .attr("fill", "#66166a")
            .on("mouseover", function (event, d) {
                d3.select(this).attr("r", 8) // Aumentar el radio del círculo
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9)
                tooltip.html(`Total Revenue: $${d.totalRevenue}`)
                    .style("left", (event.pageX + 5) + "px")
                    .style("top", (event.pageY - 28) + "px")
            })
            .on("mousemove", function (event) {
                tooltip.style("left", (event.pageX + 5) + "px")
                    .style("top", (event.pageY - 28) + "px")
            })
            .on("mouseout", function () {
                d3.select(this).attr("r", 5) // Volver a tamaño original
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0)
            })

        // Añadir título
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", -30)
            .attr("text-anchor", "middle")
            .attr("fill", "aliceblue")
            .attr("font-size", "1.8em")
            .attr("font-weight", "bold")
            .text("Sales Performance Over Time")

        // Etiqueta del eje X
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 5)
            .attr("text-anchor", "middle")
            .attr("fill", "aliceblue")
            .attr("font-size", "1.5em")
            .text("Date")

        // Etiqueta del eje Y
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -(height / 2))
            .attr("y", -40)
            .attr("text-anchor", "middle")
            .attr("fill", "aliceblue")
            .attr("font-size", "1.5em")
            .text("Total Sales")

        // Crear el tooltip
        const tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0)
            .style("position", "absolute")
            .style("background", "lightgray")
            .style("padding", "5px")
            .style("border-radius", "5px")
            .style("pointer-events", "none")

    }, [data])

    return <svg ref={ref} />
}
