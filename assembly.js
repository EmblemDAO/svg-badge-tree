function transformBadgeData( nodes ) {
  const placeholders = [
    'Compass_Set_1'
  , 'Compass_Set_2'
  , 'Compass_Set_3'
  ];
  return nodes.map(badge => ({
    ...badge
    , branch: badge.id.charAt(0)
    , index: parseInt(badge.id.charAt(badge.id.length-1)) 
    , pos: transformPosition(badge.position)
    , img: placeholders[Math.floor(Math.random() * 3)]
    , branching: ['C-1', 'C-2', 'B-1', 'D-1'].includes(badge.id)
  }));
}

function transformPosition( coords ) {
  let x = 600 + (coords[0] * 100)
    , y = 650 - (coords[1] * 100);
  return [x, y];
}

function gatherStyles( branchInfo ) {
  const classes = branchInfo.map( branch => {
    return `.${branch.name} {
              stroke: ${branch.col};
              fill: ${branch.col};
            }`;
  });
  return `<style type="text/css">
            <![CDATA[
              .con {
                stroke-width: 3;
                stroke: #BFBFBF;
              }
              .node {
                stroke-width: 4;
                stroke: #BFBFBF;
                fill: black !important;
              }
              .inner {
                stroke-width: 6;
                stroke: #808080;
              }
              ${classes.join("\n")}
            ]]>
          </style> `;
}

function gatherDefinitions( branchInfo ) {
  let defs = branchInfo.map((b) => {
    return `<filter id="f${b.name}" x="-50%" y="-50%" width="400%" height="400%">
              <feOffset result="offOut" in="SourceGraphic" dx="0" dy="2" />
              <feGaussianBlur result="blurOut" in="offOut" stdDeviation="18" />
              <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
            </filter>
            <filter id="f${b.name}c" x="-50%" y="-50%" width="400%" height="400%">
              <feOffset result="offOut" in="SourceGraphic" dx="0" dy="1" />
              <feGaussianBlur result="blurOut" in="offOut" stdDeviation="6" />
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
  // elements += `<g id="inner">
  //                <circle class="inner" cx="0" cy="0" r="34" />
  //                <circle class="inner" cx="0" cy="0" r="26" />
  //              </g>`;
  // Placeholder images
  elements += `<g id="Compass_Set_1"><image href="/assets/Compass_Set_1.png" x="-90" y="-90" width="180" height="180" /></g>`;
  elements += `<g id="Compass_Set_2"><image href="/assets/Compass_Set_2.png" x="-90" y="-90" width="180" height="180" /></g>`;
  elements += `<g id="Compass_Set_3"><image href="/assets/Compass_Set_3.png" x="-90" y="-90" width="180" height="180" /></g>`;
  return elements + "\n</defs>";
}

function renderNexus() {
  return `<circle cx="500" cy="650" r="46" fill="none" stroke="white" stroke-width="4" stroke-dasharray="4 4"/>`;
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
    pos: [x, y],
    data: { awarded: true },
    branching: false
  }
}

function renderNode( node ) {
  let n = '';
  if (node.data.awarded) {
    if (node.img) {
      // n += `<use href="#inner" x="${node.pos[0]}" y="${node.pos[1]}" />\n`;
      n += `<use href="#${node.img}" x="${node.pos[0]}" y="${node.pos[1]}" />`;
    } else {
      n = `<circle class="${node.branch}" filter="url(#f${node.branch}c)" cx="${node.pos[0]}" cy="${node.pos[1]}" r="12"  />
           <circle class="node ${node.branch}" cx="${node.pos[0]}" cy="${node.pos[1]}" r="14" />`;
    }
  } else {
    n = `<circle class="node" cx="${node.pos[0]}" cy="${node.pos[1]}" r="44" />`; 
  }
  return n;
}

function renderConnection( a, b ) {
  if (b.data.awarded) {
    return `<line class="con ${a.branch}" filter="url(#f${a.branch}c)" x1="${a.pos[0]}" y1="${a.pos[1]}" x2="${b.pos[0]}" y2="${b.pos[1]}" />`;
  } else {
    return `<line class="con" x1="${a.pos[0]}" y1="${a.pos[1]}" x2="${b.pos[0]}" y2="${b.pos[1]}" />`;
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
  return `<g id="${name}">
            ${buffer.join("\n")}
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
        { name: 'E', col: "#9EFC4E" }
      ];
  console.log(GRAPH);
  let tree = INFO.map((b, i) => {
    return renderBranch(b.name, GRAPH.filter(node => node.branch === b.name), createOriginNode(b.name, i, INFO.length-1));
  });
  // console.log(tree);
  return `<svg width="1000" height="750" viewbox="-220 0 1440 750" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            ${ gatherDefinitions(INFO) }
            ${ gatherStyles(INFO) }
            ${ renderReusableElements() }
            ${ renderNexus() }
            ${ tree.join("\n") }
          </svg>`;
}