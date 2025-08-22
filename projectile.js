const canvas = document.getElementById("trajectoryCanvas");
const ctx = canvas.getContext("2d");
const resultsDiv = document.getElementById("results");
let animationId;

// Helper: solve quadratic for time of flight
function timeOfFlight(vy, h0, g) {
    const a = -0.5 * g;
    const b = vy;
    const c = h0;
    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) return 0;
    const t1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const t2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    return Math.max(t1, t2);
}

function calculateProjectile() {
    const v0 = parseFloat(document.getElementById("velocity").value);
    const angleDeg = parseFloat(document.getElementById("angle").value);
    const h0 = parseFloat(document.getElementById("height").value);
    const g = parseFloat(document.querySelector("#gravityPreset").value);

    if(g === 9.81) {
        document.getElementById("earthImg").style.display = 'block';
        document.getElementById("moonImg").style.display = 'none';
        document.getElementById("marsImg").style.display = 'none';
        document.getElementById("jupiterImg").style.display = 'none';
        document.getElementById("sunImg").style.display = 'none';

    } else if(g === 1.62) {
        document.getElementById("earthImg").style.display = 'none';
        document.getElementById("moonImg").style.display = 'block';
        document.getElementById("marsImg").style.display = 'none';
        document.getElementById("jupiterImg").style.display = 'none';
        document.getElementById("sunImg").style.display = 'none';
    } else if(g === 3.71) {
        document.getElementById("earthImg").style.display = 'none';
        document.getElementById("moonImg").style.display = 'none';
        document.getElementById("marsImg").style.display = 'block';
        document.getElementById("jupiterImg").style.display = 'none';
        document.getElementById("sunImg").style.display = 'none';
    } else if(g === 24.79) {
        document.getElementById("earthImg").style.display = 'none';
        document.getElementById("moonImg").style.display = 'none';
        document.getElementById("marsImg").style.display = 'none';
        document.getElementById("jupiterImg").style.display = 'block';
        document.getElementById("sunImg").style.display = 'none';
    } else if(g === 274) {
        document.getElementById("earthImg").style.display = 'none';
        document.getElementById("moonImg").style.display = 'none';
        document.getElementById("marsImg").style.display = 'none';
        document.getElementById("jupiterImg").style.display = 'none';
        document.getElementById("sunImg").style.display = 'block';
    }

    const angleRad = angleDeg * Math.PI / 180;
    const vx0 = v0 * Math.cos(angleRad);
    const vy0 = v0 * Math.sin(angleRad);

    const totalTime = timeOfFlight(vy0, h0, g);
    const tApex = vy0 / g;

    const maxHeight = h0 + (vy0 ** 2) / (2 * g);
    const range = vx0 * totalTime;
    const halfRange = range / 2;

    const vyFinal = vy0 - g * totalTime;
    const vxFinal = vx0;
    const vFinal = Math.sqrt(vxFinal ** 2 + vyFinal ** 2);

    const vyApex = vy0 - g * tApex;
    const vxApex = vx0;
    const vApex = Math.sqrt(vyApex ** 2 + vxApex ** 2);

    const angleFinalRad = Math.atan2(vyFinal, vxFinal);
    const angleFinalDeg = angleFinalRad * 180 / Math.PI; 

    // Generate trajectory points
    let trajectory = [];
    const steps = 100;
    for (let i = 0; i <= steps; i++) {
        const t = (i / steps) * totalTime;
        const x = vx0 * t;
        const y = h0 + vy0 * t - 0.5 * g * t * t;
        if (y < 0) break;
        trajectory.push({ x, y });
    }

    drawTrajectory(trajectory);

    // Display results
    resultsDiv.innerHTML = `
    <h3 class="sectionTitle">Results</h3>
    <label class="input-label">
        <div class="inputLine">
            <p>
                <strong>Initial velocity (v₀)</strong>:
                <button class="moreBtnvelocity" onclick="showMore('velocity')">more</button>
            </p>
            <div id="v0" class="resultBox">${v0.toFixed(2)} m/s</div>
        </div>
        <div class="extra-inputs velocity">
            <div class="inputLine">
                vx₀: <div id="vx0" class="resultBox">${vx0.toFixed(2)} m/s</div>
            </div>
            <div class="inputLine">
                vy₀: <div id="vy0" class="resultBox">${vy0.toFixed(2)} m/s</div>
            </div>
            <div class="inputLine">
                <p>
                    v(final):
                    <button class="moreBtnvf" onclick="showMore('vf')">more</button>
                </p>
                <div id="vf" class="resultBox">${vFinal.toFixed(2)} m/s</div>
            </div>
            <div class="extra-inputs vf">
                <div class="inputLine">
                    vx(f): <div id="vxf" class="resultBox">${vxFinal.toFixed(2)} m/s</div>
                </div>
                <div class="inputLine">
                    vy(f): <div id="vyf" class="resultBox">${vyFinal.toFixed(2)} m/s</div>
                </div>
            </div>
            <div class="inputLine">
                <p>
                    v(apex):
                    <button class="moreBtnva" onclick="showMore('va')">more</button>
                </p>
                <div id="va" class="resultBox">${vApex.toFixed(2)} m/s</div>
            </div>
            <div class="extra-inputs va">
                <div class="inputLine">
                    vx(a): <div id="vxa" class="resultBox">${vxApex.toFixed(2)} m/s</div>
                </div>
                <div class="inputLine">
                    vy(a): <div id="vya" class="resultBox">${vyApex.toFixed(2)} m/s</div>
                </div>
            </div>

        </div>
    </label>

    <label class="input-label">
        <div class="inputLine">
            <strong>Launch angle (θ₀): </strong><div id="angle0" class="resultBox">${angleDeg.toFixed(2)} deg</div>
        </div>
    </label>

    <label class="input-label">
        <div class="inputLine">
            <strong>Angle(final): </strong><div id="angleFinal" class="resultBox">${angleFinalDeg.toFixed(2)} deg</div>
        </div>
    </label>

    <label class="input-label">
        <div class="inputLine">
            <p>
                <strong>Initial height (y₀):</strong>
                <button class="moreBtny-coordinate" onclick="showMore('y-coordinate')">more</button>
            </p>
            <div id="y0" class="resultBox">${h0.toFixed(2)} m</div>
        </div>
        <div class="extra-inputs y-coordinate">
            <div class="inputLine">
                y(final): <div id="yf" class="resultBox">0 m</div>
            </div>
            <div class="inputLine">
                y(apex): <div id="yApex" class="resultBox">${maxHeight.toFixed(2)} m</div>
            </div>
        </div>
    </label>

    <label class="input-label">
        <div class="inputLine">
            <p>
                <strong>Initial x (x₀):</strong>
                <button class="moreBtnx-coordinate" onclick="showMore('x-coordinate')">more</button>
            </p>
            <div id="x0" class="resultBox">0 m</div>
        </div>
        <div class="extra-inputs x-coordinate">
            <div class="inputLine">
                x(final): <div id="xf" class="resultBox">${range.toFixed(2)} m</div>
            </div>
            <div class="inputLine">
                x(apex): <div id="xApex" class="resultBox">${halfRange.toFixed(2)} m</div>
            </div>
        </div>
    </label>

    <label class="input-label">
        <div class="inputLine">
            <strong>Gravitational const: </strong><div id="gravityPreset" class="resultBox">${g.toFixed(2)} m/s^2</div>
        </div>
    </label>

    <label class="input-label">
        <div class="inputLine">
            <strong>t (time of flight): </strong><div id="tFlight" class="resultBox">${totalTime.toFixed(2)} s</div>
        </div>
    </label>

    <label class="input-label">
        <div class="inputLine">
            <strong>t (time to apex): </strong><div id="tApex" class="resultBox">${tApex.toFixed(2)} s</div>
        </div>
    </label>
  `;

    return { vx0, vy0, g, h0, trajectory, totalTime };
}

function drawTrajectory(trajectory) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (trajectory.length === 0) return;

  // Scale to fit canvas
  const maxX = Math.max(...trajectory.map(p => p.x));
  const maxY = Math.max(...trajectory.map(p => p.y));
  const scaleX = canvas.width / (maxX * 1.1);
  const scaleY = canvas.height / (maxY * 1.2);

  ctx.beginPath();
  ctx.strokeStyle = "#4682A9";
  ctx.lineWidth = 2;
  trajectory.forEach((p, i) => {
    const cx = p.x * scaleX;
    const cy = canvas.height - p.y * scaleY;
    if (i === 0) ctx.moveTo(cx, cy);
    else ctx.lineTo(cx, cy);
  });
  ctx.stroke();
}

function drawProjectile(x, y, scaleX, scaleY) {
  ctx.beginPath();
  ctx.arc(x * scaleX, canvas.height - y * scaleY, 5, 0, 2 * Math.PI);
  ctx.fillStyle = "blue";
  ctx.fill();
}

function playAnimation() {

  cancelAnimationFrame(animationId); 
  const { vx0, vy0, g, h0, totalTime } = calculateProjectile();

  const maxX = vx0 * totalTime;
  const maxY = h0 + (vy0 ** 2) / (2 * g);
  const scaleX = canvas.width / (maxX * 1.1);
  const scaleY = canvas.height / (maxY * 1.2);

  let start = null;

  function animate(timestamp) {
    if (!start) start = timestamp;
    let elapsed = (timestamp - start) / 1000;
    if (elapsed > totalTime) elapsed = totalTime;

    const x = vx0 * elapsed;
    const y = h0 + vy0 * elapsed - 0.5 * g * elapsed * elapsed;

    calculateProjectile();
    drawProjectile(x, y, scaleX, scaleY);

    if (elapsed < totalTime) {
      animationId = requestAnimationFrame(animate);
    }
  }
  animationId = requestAnimationFrame(animate);
}

// Hook up listeners
window.addEventListener("DOMContentLoaded", () => {
  calculateProjectile();
//   document.getElementById("calculateBtn").addEventListener("click", calculateProjectile);
  document.getElementById("playBtn").addEventListener("click", playAnimation);
//   document.getElementById("toggleFormulasBtn").addEventListener("click", () => {
//     const f = document.getElementById("formulas");
//     f.style.display = f.style.display === "none" ? "block" : "none";
//   });

  document.querySelectorAll("#velocity, #angle, #height, #gravityPreset")
    .forEach(el => {
      el.addEventListener("input", calculateProjectile);
      el.addEventListener("change", calculateProjectile);
    });
});


function showMore(nameOfClass) {
    let btn = document.querySelector(`.moreBtn${nameOfClass}`)
    let element = document.querySelector(`.${nameOfClass}`);
    if(element.classList.contains(`showMore${nameOfClass}`)) {
        element.classList.remove(`showMore${nameOfClass}`)
        btn.innerHTML = "more"
    } else {
        element.classList.add(`showMore${nameOfClass}`);
        btn.innerHTML = "less"
    }
}