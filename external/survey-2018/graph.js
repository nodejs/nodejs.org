/* global $, d3 */

var toggle = 0
var linkedByIndex = {}

function MyGraph (graphContainerElement) {
  // Add and remove elements on the graph object
  this.addNode = function (id, value) {
    nodes.push({ 'id': id, 'value': value })
    update()
  }

  this.removeNode = function (id) {
    var i = 0
    var n = findNode(id)
    while (i < links.length) {
      if ((links[i]['source'] == n) || (links[i]['target'] == n)) {
        links.splice(i, 1)
      } else i++
    }
    nodes.splice(findNodeIndex(id), 1)
    update()
  }

  this.removeLink = function (source, target) {
    for (var i = 0; i < links.length; i++) {
      if (links[i].source.id == source && links[i].target.id == target) {
        links.splice(i, 1)
        break
      }
    }
    update()
  }

  this.removeallLinks = function () {
    links.splice(0, links.length)
    update()
  }

  this.removeAllNodes = function () {
    nodes.splice(0, links.length)
    update()
  }

  this.addLink = function (source, target, weight) {
    links.push({ 'source': findNode(source), 'target': findNode(target), 'weight': weight })
    update()
  }

  var findNode = function (id) {
    for (var i in nodes) {
      if (nodes[i]['id'] === id) return nodes[i]
    };
  }

  var findNodeIndex = function (id) {
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].id == id) {
        return i
      }
    };
  }

  var color = d3.scale.category20()

  var vis = d3.select(graphContainerElement)
    .append('svg:svg')
    .classed('svg-container', true)
    // .attr("id", "svg")
    // .attr("pointer-events", "all")
    .attr('perserveAspectRatio', 'xMinYMin meet')
    .attr('viewBox', '0 0 350 600')
    .classed('svg-content-responsive', true)
    .append('svg:g')

  var force = d3.layout.force()
    .charge(800)
    .gravity(0.2)
    .friction(0.2)
    .linkDistance(80)

  var nodes = force.nodes()
  var links = force.links()

  vis.append('g').attr('class', 'links')
  vis.append('g').attr('class', 'nodes')

  var update = function () {
    var link = vis.selectAll('.links').selectAll('.link')
      .data(links, function (d) {
        if (d.weight > 0) {
          return d.source.id + '-' + d.target.id
        }
      })

    link.enter().append('line')
      .attr('id', function (d) {
        if (d.weight > 0) {
          return d.source.id + '-' + d.target.id
        }
      })
      .attr('stroke-width', function (d) {
        if (d.weight > 0) {
          return (d.weight / 10 * 2)
        }
      })
      .attr('stroke', function (d) {
        return color(d.weight / 10 * 2)
      })
      .attr('class', 'link')

    link.append('title')
      .text(function (d) {
        // console.log(d.id)
        return d.value
      })

    // link.exit().remove();

    var node = vis.selectAll('g.node')
      .style('opacity', 1)
      .data(nodes, function (d) {
        if (d.weight > 0) {
          // console.log(d)
          return d.id
        }
      })

    var neighboring = function (a, b) {
      return linkedByIndex[a.index + ',' + b.index]
    }

    var dblclick = function () {
      if (toggle === 0) {
        var d = d3.select(this).node().__data__

        node.style('opacity', function (o) {
          return neighboring(d, o) | neighboring(o, d) ? 1 : 0
        })

        d3.selectAll('.link')
          .style('opacity', function (o) {
            return o.source === d || o.target === d ? 1 : 0
          })

        toggle = 1
      } else {
        node.style('opacity', 1)
        link.style('opacity', 1)

        toggle = 0
      }
    }

    var nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .on('dblclick', dblclick)
      .call(force.drag)

    nodeEnter.append('svg:circle')
      .attr('id', function (d) {
        return 'Node;' + d.id
      })
      .attr('class', 'nodeStrokeClass')
      .attr('fill', function (d) {
        if (d.value === 0) {
          return 'rgb(68, 136, 62)'
        } else {
          return color(d.value * 10)
        }
      })

    nodeEnter.append('svg:text')
      .attr('class', 'textClass')
      .attr('x', 24)
      .attr('y', '.81em')
      .attr('fill', 'black')
      .text(function (d) {
        if (d.weight > 0) {
          return d.id
        }
      })

    d3.selectAll('circle')
      .attr('r', function (d) {
        return (d.weight || 0) / 5 + 0.2
      })

    linkedByIndex = {}

    for (var i = 0; i < nodes.length; i++) {
      linkedByIndex[i + ',' + i] = 1
    };
    links.forEach(function (d) {
      if (d.weight > 0) {
        linkedByIndex[d.source.index + ',' + d.target.index] = 1
      }
    })
    // -----------------------------------------------------------------

    // --------------------------------------------------------------------------------------------------------

    node.exit().remove()

    force.on('tick', function () {
      node.attr('transform', function (d) {
        return 'translate(' + d.x + ',' + d.y + ')'
      })

      link.attr('x1', function (d) {
        return d.source.x
      })
        .attr('y1', function (d) {
          return d.source.y
        })
        .attr('x2', function (d) {
          return d.target.x
        })
        .attr('y2', function (d) {
          return d.target.y
        })
    })

    // Restart the force layout.
    force
      .gravity(0.01)
      .charge(-100)
      .friction(0.01)
      .linkDistance(function (d) { return 120 })
      .size([350, 300])
      .start()
  }

  // Make it all go
  update()
}

function drawGraphBE () {
  var graph = new MyGraph('#graph-container')

  d3.csv('nodes.csv')
    .row(function (d) { graph.addNode(d.name, d.value) })
    .get()

  if (document.getElementById('cr1').checked) {
    d3.csv('linksBE.csv').row(function (d) {
      if (d.weight > 0) {
        graph.addLink(d.source, d.target, d.weight)
        // console.log('BE ALL')
      }
    }).get()
  }

  if (document.getElementById('cr2').checked) {
    d3.csv('linksBE.csv').row(function (d) {
      if (d.weight == 5 || d.weight == 4) {
        graph.addLink(d.source, d.target, d.weight)
        // console.log('BE Strong')
        // console.log(d.weight)
      }
    }).get()
  }

  if (document.getElementById('cr3').checked) {
    d3.csv('linksBE.csv').row(function (d) {
      if (d.weight === 5 || d.weight === 4 || d.weight === 3 || d.weight === 2) {
        graph.addLink(d.source, d.target, d.weight)
        // console.log('BE Strong and Medium')
        // console.log(d.weight)
      }
    }).get()
  }

  keepNodesOnTop()
}

function drawGraphFE () {
  // TODO

  var graph = new MyGraph('#graph-container')

  d3.csv('nodes.csv')
    .row(function (d) { graph.addNode(d.name, d.value) })
    .get()

  if (document.getElementById('cr1').checked) {
    d3.csv('linksFE.csv').row(function (d) {
      if (d.weight > 0) {
        graph.addLink(d.source, d.target, d.weight)
        // console.log('FE ALL')
      }
    }).get()
  }

  if (document.getElementById('cr2').checked) {
    d3.csv('linksFE.csv').row(function (d) {
      if (d.weight === 5 || d.weight === 4) {
        graph.addLink(d.source, d.target, d.weight)
        // console.log('FE Strong')
        // console.log(d.weight)
      }
    }).get()
  }

  if (document.getElementById('cr3').checked) {
    d3.csv('linksFE.csv').row(function (d) {
      if (d.weight === 5 || d.weight === 4 || d.weight === 3 || d.weight === 2) {
        graph.addLink(d.source, d.target, d.weight)
        // console.log('FE Strong and Medium')
        // console.log(d.weight)
      }
    }).get()
  }

  keepNodesOnTop()
}

function drawGraphFS () {
  // TODO

  var graph = new MyGraph('#graph-container')

  d3.csv('nodes.csv')
    .row(function (d) { graph.addNode(d.name, d.value) })
    .get()

  if (document.getElementById('cr1').checked) {
    d3.csv('linksFS.csv').row(function (d) {
      if (d.weight > 0) {
        graph.addLink(d.source, d.target, d.weight)
        // console.log('FS ALL')
      }
    }).get()
  }

  if (document.getElementById('cr2').checked) {
    d3.csv('linksFS.csv').row(function (d) {
      if (d.weight === 5 || d.weight === 4) {
        graph.addLink(d.source, d.target, d.weight)
        // console.log('FS Strong')
        // console.log(d.weight)
      }
    }).get()
  }

  if (document.getElementById('cr3').checked) {
    d3.csv('linksFS.csv').row(function (d) {
      if (d.weight === 5 || d.weight === 4 || d.weight === 3 || d.weight === 2) {
        graph.addLink(d.source, d.target, d.weight)
        // console.log('FS Strong and Medium')
        // console.log(d.weight)
      }
    }).get()
  }

  keepNodesOnTop()
}

$(function () {
  $('[data-action]').click(function () {
    window[$(this).attr('data-action')]()
  })
})

document.getElementById('tr1').checked = true
document.getElementById('cr1').checked = true
drawGraphBE()

function keepNodesOnTop () {
  $('.nodeStrokeClass').each(function (index) {
    var gnode = this.parentNode
    gnode.parentNode.appendChild(gnode)
  })
  d3.selectAll('circle').attr('r', function (d) {
    return d.weight
  })
}

function addNodes () {
  if (document.getElementById('tr1').checked) {
    d3.select('svg').remove()
    drawGraphBE()
  }
  if (document.getElementById('tr2').checked) {
    d3.select('svg').remove()
    drawGraphFE()
  }
  if (document.getElementById('tr3').checked) {
    d3.select('svg').remove()
    drawGraphFS()
  }
}
