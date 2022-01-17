function transformBadgeData( nodes ) {
  const GRID_ITEMS = nodes.filter((node) => node.data && node.data.awarded);
  return nodes.map(badge => ({
    ...badge
    , branch: badge.id.charAt(0)
    , index: parseInt(badge.id.charAt(badge.id.length-1)) 
    , tpos: transformPosition(badge.position)
    , gpos: generateGridPosition(badge, GRID_ITEMS)
    , img: badge.image
    , branching: ['C-1', 'C-2', 'B-1', 'D-1'].includes(badge.id)
  }));
}

function transformPosition( coords ) {
  let x = 600 + (coords[0] * 100)
    , y = 650 - (coords[1] * 100);
  return [x, y];
}

function generateGridPosition( badge, pool ) {
  const INDEX = pool.indexOf(badge)
      , COLS = 8
      , COL_WIDTH = 1240 / COLS;
  if (INDEX >= 0) {
    let col = (INDEX > COLS) ? INDEX % pool.length : INDEX;
    const row = Math.floor(INDEX / COLS);
    col -= row * COLS;
    return [col * COL_WIDTH - 40, 90 + row * COL_WIDTH + 50];
  } else {
    return [0, 0];
  }
}

function gatherStyles( branchInfo ) {
  const classes = branchInfo.map( branch => {
    return `.${branch.name} {
              stroke: ${branch.col};
              fill: ${branch.col};
            }
            .${branch.name.toLowerCase()} {
              stroke: ${branch.col};
            }`;
  });
  return `<style type="text/css">
            <![CDATA[
              @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
              .con {
                stroke-width: 3;
                stroke: #BFBFBF;
                transition: opacity 0s;
              }
              .gridItem text {
                opacity: 0;
              }
              .node {
                stroke-width: 4;
                stroke: #BFBFBF;
                fill: black !important;
              }
              .node,
              .icon {
                transition: all .6s ease, opacity 0s;
              }
              .inner {
                stroke-width: 6;
                stroke: #808080;
              }
              .label {
                fill: #7efcf6;
                text-anchor: middle;
                font-family: 'Inter', sans-serif;
                font-size: 12px;
                text-transform: uppercase;
                transition: opacity .6s ease;
              }
              .gridded .con,
              .gridded .node:not([data-awarded]),
              .gridded .icon:not([data-awarded]) {
                opacity: 0;
              }
              .gridded .label {
                opacity: 1;
              }
              #NEXUS.hidden {
                opacity: 0;
              }
              ${classes.join("\n")}
              #NEXUS, .tree {
                transition: opacity 1s ease;
              }
              @media only screen and (max-width: 480px) {
                #NEXUS, .tree { opacity: 0 }
              }
              @media only screen and (min-width: 480px) {
                #roster { opacity: 0 }
              } 
            ]]>
          </style> `;
}

function gatherDefinitions( branchInfo ) {
  let defs = branchInfo.map((b) => {
    return `<filter id="f${b.name}" x="-50%" y="-50%" width="400%" height="400%">
              <feOffset result="offOut" in="SourceGraphic" dx="0" dy="2" />
              <feGaussianBlur result="blurOut" in="offOut" stdDeviation="18" />
              <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
            </filter>`;
  });
  return `<defs>
            ${defs.join("\n")}
          </defs>`;
}

function renderReusableElements() {
  let elements = "<defs>\n";
  // Inner circles (part of node image background)
  elements += `<g id="inner">
                 <circle class="inner" cx="0" cy="0" r="34" />
                 <circle class="inner" cx="0" cy="0" r="26" />
               </g>`;
  return elements + "\n</defs>";
}

function renderNexus() {
  return `<circle id="NEXUS" class="hidden" cx="500" cy="650" r="46" fill="none" stroke="white" stroke-width="4" stroke-dasharray="4 4"/>`;
}

function createOriginNode( branch, index, total ) {
  let a = (index / total) * Math.PI
    , r = 84
    , x = 500 + Math.cos(Math.PI + a) * r
    , y = 650 - Math.sin(a) * r;
  return {
    branch,
    id: branch + "-0",
    index: 0,
    tpos: [x, y],
    gpos: [x, y],
    data: { awarded: true },
    branching: false
  }
}

function renderNode( node ) {
  const AWARDED = node.data.awarded;
  let n = `<g class="gridItem" data-tpos="[${node.tpos[0]}, ${node.tpos[1]}]" data-gpos="[${node.gpos[0]}, ${node.gpos[1]}]">`;
  if (node.data.awarded) {
    n += `<circle class="${node.branch}" ${ (node.img) ? 'data-awarded' : '' } filter="url(#f${node.branch}${node.img ? '' : 'c'})" cx="${node.gpos[0]}" cy="${node.gpos[1]}" r="${node.img ? 42 : 12}"  />
         <circle class="node ${node.branch}" ${ (node.img) ? 'data-awarded' : '' } cx="${node.gpos[0]}" cy="${node.gpos[1]}" r="${node.img ? 44 : 14}" />`;
    if (node.data.definitionID) {
      n += `<text class="label" x="${node.gpos[0]}" y="${node.gpos[1] + 64}">${node.data.definitionID}</text>`;
    }
  } else {
    n += `<circle class="node" cx="${node.tpos[0]}" cy="${node.tpos[1]}" r="44" />`; 
  }
  if (node.img) {
    n += `<use class="icon" ${ AWARDED ? 'data-awarded' : '' } href="#inner" x="${AWARDED ? node.gpos[0] : node.tpos[0]}" y="${ AWARDED ? node.gpos[1] : node.tpos[1]}" />\n`;
  }
  n += `</g>`;
  return n;
}

function renderRosterNode( node, x, y ) {
  return `<circle class="${node.branch.toLowerCase()}" filter="url(#f${node.branch}${node.img ? '' : 'c'})" cx="${x}" cy="${y}" r="42"  />
          <circle class="node ${node.branch.toLowerCase()}" cx="${x}" cy="${y}" r="44" />
          <use href="#inner" x="${x}" y="${y}" />`;
}

function renderConnection( a, b ) {
  if (b.data.awarded) {
    return `<line class="con ${a.branch}" x1="${a.tpos[0]}" y1="${a.tpos[1]}" x2="${b.tpos[0]}" y2="${b.tpos[1]}" />`;
  } else {
    return `<line class="con" x1="${a.tpos[0]}" y1="${a.tpos[1]}" x2="${b.tpos[0]}" y2="${b.tpos[1]}" />`;
  }
}

function renderBranch( name, nodes, origin ) {
  console.log('Rendering branch with', nodes);
  let buffer = []
    , circles = [origin, ...nodes];
  let branchNode = circles[1];
  for (let c = 1; c < circles.length; c++) {
    if (c >= 1 && circles[c-1].branching) 
      branchNode = circles[c-1];
    let a = ((circles[c].index == 1 && circles[c].id.length > 3) || 
              circles[c].id === 'C-2') ? branchNode : circles[c-1]
      , b = circles[c];
    buffer.push(renderConnection(a, b));
  } 
  for (let d = 0; d < circles.length; d++) {
    buffer.push(renderNode(circles[d]));
  }
  // console.log("Buffer", buffer);
  return `<g id="${name}" class="tree gridded">
            ${buffer.join("\n")}
          </g>`;
}

function renderRoster( roster ) {
  return `<g id="roster">
            ${roster.join("\n")}
          </g>`;
}

// EXPORT /////////////////////////////////////////////////////////////////////
export default function( nodes ) {
  const GRAPH = transformBadgeData(nodes)
      , INFO = [
        { name: 'A', col: '#EA3778' },
        { name: 'B', col: "#FCF151" },
        { name: 'C', col: "#E93323" },
        { name: 'D', col: "#75FBF3" },
        { name: 'E', col: "#9EFC4E" }]
      , ROSTER = GRAPH.filter((node) => node.data && node.data.awarded);
  // console.log(GRAPH);
  let tree = INFO.map((b, i) => {
    return renderBranch(b.name, GRAPH.filter(node => node.branch === b.name), createOriginNode(b.name, i, INFO.length-1));
  });
  let row = 0, col = 0;
  let roster = [];
  for (let n of ROSTER) {
    roster.push(renderRosterNode(n, 510 + ((col - 1)) * 100, (row + 1) * 100 - 25));
    col += 1;
    if (col >= 3) {
      row += 1;
      col = 0;
    }
  }
  // console.log(tree);
  return `<svg viewBox="-220 0 1440 750" 
               preserveAspectRatio="xMidYMin slice"              
               xmlns="http://www.w3.org/2000/svg" 
               xmlns:xlink="http://www.w3.org/1999/xlink">
            ${ gatherDefinitions(INFO) }
            ${ gatherStyles(INFO) }
            ${ renderReusableElements() }
            ${ renderNexus() }
            ${ renderRoster(roster) }
            ${ tree.join("\n") }
          </svg>`;
}