function transformBadgeData( nodes ) {
  // const GRID_ITEMS = nodes.filter((node) => node.data && node.data.awarded);
  const GRID_ITEMS = nodes.filter((node) => node.data);
  return nodes.map(badge => ({
    ...badge
    , branch: badge.id.charAt(0)
    , index: parseInt(badge.id.charAt(badge.id.length-1)) 
    , tpos: transformPosition(badge.position)
    , gpos: generateGridPosition(badge, GRID_ITEMS)
    , img: badge.image
    , p: "badge" + Math.ceil((Math.random() * 3)) // placeholder
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
              fill: ${branch.col};
            }
            .${branch.name}_ {
              stroke: ${branch.col};
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
                stroke-dasharray: 200;
                stroke-dashoffset: 0;
                transition: opacity 0s, stroke-dashoffset 2s ease-out;
              }
              .gridItem text {
                opacity: 0;
              }
              .node {
                stroke-width: 4;
                stroke: #BFBFBF;
                fill: black !important;
              }
              .node {
                transition: all 0.8s cubic-bezier(0.65, 0, 0.35, 1), opacity 0s;
              }
              .glow {
                transition: cx 0.8s cubic-bezier(0.65, 0, 0.35, 1), cy 0.8s cubic-bezier(0.65, 0, 0.35, 1);
              }
              .icon {
                transition: x 0.8s cubic-bezier(0.65, 0, 0.35, 1), y 0.8s cubic-bezier(0.65, 0, 0.35, 1);
              }
              .inner {
                stroke-width: 6;
                stroke: #808080;
              }
              .text,
              .label {
                fill: #7efcf6;
              }
              .label {
                text-anchor: middle;
                font-family: 'Inter', sans-serif;
                font-size: 12px;
                text-transform: uppercase;
                transition: opacity .6s ease;
              }
              .gridded .con,
              .gridded .origin {
                opacity: 0;
              }
              .gridded .con {
                stroke-dashoffset: 200;
              }
              .gridded .label {
                opacity: 1;
              }
              .nexus {
                font-size: 0.5em;
                letter-spacing: 3px;
              }
              #NEXUS.hidden {
                opacity: 0;
              }
              ${classes.join("\n")}
              .nexus, .tree {
                transition: opacity .6s ease;
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
            <filter id="greyscale">
              <feColorMatrix type="matrix" values="0.1 0.1 0.1 0 0 0.1 0.1 0.1 0 0 0.1 0.1 0.1 0 0 0 0 0 1 0"/>
            </filter>
            ${defs.join("\n")}
          </defs>`;
}

function renderReusableElements( nodes ) {
  let images = [];
  let elements = "<defs>\n";
  // Nexus text paths
  elements += `<path transform="translate(500, 650)" d="M0,-46 C-25.4050985,-46 -46,-25.4050985 -46,0 C-46,25.4050985 -25.4050985,46 0,46 C25.4050985,46 46,25.4050985 46,0 C46,-25.4050985 25.4050985,-46 0,-46 Z" id="nexusCircleOuter" />`;
  elements += `<path transform="translate(500, 650) scale(0.8, 0.8)" d="M0,-46 C-25.4050985,-46 -46,-25.4050985 -46,0 C-46,25.4050985 -25.4050985,46 0,46 C25.4050985,46 46,25.4050985 46,0 C46,-25.4050985 25.4050985,-46 0,-46 Z" id="nexusCircleInner" />`;
  // Badge icons
  nodes.forEach((node) => {
    if (!images.includes(node.p)) {
      elements += `<g id="${node.p}"><image href="/assets/${node.p}.png" x="-48" y="-48" width="96" height="96" /></g>`;
      images.push(node.p);
    }
  });
  return elements + "\n</defs>";
}

function renderNexus( address ) {
  return `<g id="NEXUS" class="hidden">
            <text class="nexus text">
              <textPath xlink:href="#nexusCircleOuter">
                ${address}
              </textPath>
              <animateTransform attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0 500 650"
                to="359 500 650"
                dur="32s"
                repeatCount="indefinite"/>
            </text>
            <text id="NEXUS" class="nexus" fill="white">
              <textPath xlink:href="#nexusCircleInner">
                emblemdao.com - emblemdao.com -
              </textPath>
              <animateTransform attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0 500 650"
                to="-359 500 650"
                dur="32s"
                repeatCount="indefinite"/>
            </text>
          </g>`;
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
  n += `<title>${node.data.definitionID || ""}</title>`;
  if (node.data.awarded) {
    n += `<circle class="${node.branch} glow" filter="url(#f${node.branch}${node.img ? '' : 'c'})" cx="${node.gpos[0]}" cy="${node.gpos[1]}" r="${node.img ? 42 : 12}"  />`;
    if (!node.img) {
      n += `<circle class="node origin ${node.branch}_" cx="${node.gpos[0]}" cy="${node.gpos[1]}" r="14" />`;
    }
  } else {
    // n += `<circle class="node" cx="${node.gpos[0]}" cy="${node.gpos[1]}" r="44" />`; 
  }
  if (node.data.definitionID) {
    n += `<text class="label" x="${node.gpos[0]}" y="${node.gpos[1] + 64}">${node.data.definitionID}</text>`;
  }
  if (node.p) {
    // n += `<use class="icon" ${ AWARDED ? 'data-awarded' : '' } href="#inner" x="${AWARDED ? node.gpos[0] : node.tpos[0]}" y="${ AWARDED ? node.gpos[1] : node.tpos[1]}" />\n`;
    n += `<use class="icon" href="#${node.p}" x="${node.gpos[0]}" y="${node.gpos[1]}"  ${ AWARDED ? 'data-awarded' : 'filter="url(#greyscale)"' } />`;
  }
  n += `</g>`;
  return n;
}

function renderRosterNode( node, x, y ) {
  return `<circle class="${node.branch.toLowerCase()}" filter="url(#f${node.branch}${node.img ? '' : 'c'})" cx="${x}" cy="${y}" r="42"  />
          <circle class="node ${node.branch.toLowerCase()}" cx="${x}" cy="${y}" r="44" />
          <use href="#${node.p}" x="${x}" y="${y}" />`;
}

function renderConnection( a, b ) {
  if (b.data.awarded) {
    return `<line class="con ${a.branch}_" x1="${a.tpos[0]}" y1="${a.tpos[1]}" x2="${b.tpos[0]}" y2="${b.tpos[1]}" />`;
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
export default function( nodes, address ) {
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
               xmlns:xlink="http://www.w3.org/1999/xlink"
               style="background: #061111;">
            ${ gatherDefinitions(INFO) }
            ${ gatherStyles(INFO) }
            ${ renderReusableElements(GRAPH) }
            ${ renderNexus(address) }
            ${ renderRoster(roster) }
            ${ tree.join("\n") }
          </svg>`;
}