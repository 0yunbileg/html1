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

function solveProjectile() {
    // 1. Get all inputs
    const v0 = parseFloat(document.getElementById("v0").value);
    const vx0 = parseFloat(document.getElementById("vx0").value);
    const vy0 = parseFloat(document.getElementById("vy0").value);
    const vt = parseFloat(document.getElementById("vt").value);
    const vxt = parseFloat(document.getElementById("vxt").value);
    const vyt = parseFloat(document.getElementById("vyt").value);
    const vf = parseFloat(document.getElementById("vf").value);
    const va = parseFloat(document.getElementById("va").value);

    const angle0 = parseFloat(document.getElementById("angle0").value) * (Math.PI / 180);
    const angleT = parseFloat(document.getElementById("angleT").value) * (Math.PI / 180);
    const angleFinal = parseFloat(document.getElementById("angleFinal").value) * (Math.PI / 180);

    const y0 = parseFloat(document.getElementById("y0").value);
    const yt = parseFloat(document.getElementById("yt").value);
    const yf = parseFloat(document.getElementById("yf").value);
    const yApex = parseFloat(document.getElementById("yApex").value);

    const x0 = parseFloat(document.getElementById("x0").value);
    const xt = parseFloat(document.getElementById("xt").value);
    const xf = parseFloat(document.getElementById("xf").value);
    const xApex = parseFloat(document.getElementById("xApex").value);

    const gravityPreset = parseFloat(document.getElementById("gravityPreset").value);

    const tCustom = parseFloat(document.getElementById("tCustom").value);
    const tFlight = parseFloat(document.getElementById("tFlight").value);
    const tApex = parseFloat(document.getElementById("tApex").value);

    const g = gravityPreset || 9.81; // default gravity

    // 2. Store known values in an object
    const known = {
        v0, vx0, vy0, vt, vxt, vyt, vf, va,
        angle0, angleT, angleFinal,
        y0, yt, yf, yApex,
        x0, xt, xf, xApex,
        tCustom, tFlight, tApex,
        g
    };

    // 3. Iteratively compute missing values
    let updated = true;
    while (updated) {
        updated = false;

        // Example calculations (expand with more formulas):
        // v0
        if (!isFinite(known.v0)) {
            // v0 = sqrt(vx0^2​+vy0^2​)
            if(isFinite(known.vx0) && isFinite(known.vy0)) {
                known.v0 = Math.sqrt(known.vx0 ** 2 + known.vy0 ** 2);
                updated = true;
            }

            //max height
            if(isFinite(known.vy0) && isFinite(known.angle0)) {
                known.v0 = known.vy0 / Math.sin(known.angle0)
                updated = true;
            }

            //range
            if(isFinite(known.range) && isFinite(known.angle0)) {
                known.v0 = Math.sqrt(known.range / Math.sin(2 * known.angle0))
                updated = true; 
            }

            //time of flight
            if(isFinite(known.vx0) && isFinite(known.angle0)) {
                known.v0 = known.vx0 / Math.cos(known.angle0)
                updated = true;
            }
        }
        // vx0 = v0 * cos(angle0)
        if (!isFinite(known.vx0) && isFinite(known.v0) && isFinite(known.angle0)) {
            known.vx0 = known.v0 * Math.cos(known.angle0 * Math.PI/180);
            updated = true;
        }

        // vy0 = v0 * sin(angle0)
        if (!isFinite(known.vy0) && isFinite(known.v0) && isFinite(known.angle0)) {
            known.vy0 = known.v0 * Math.sin(known.angle0 * Math.PI/180);
            updated = true;
        }

        // tApex = vy0 / g
        if (!isFinite(known.tApex) && isFinite(known.vy0) && isFinite(known.g)) {
            known.tApex = known.vy0 / known.g;
            updated = true;
        }

        // yApex = y0 + vy0^2 / (2*g)
        if (!isFinite(known.yApex) && isFinite(known.vy0) && isFinite(known.g) && isFinite(known.y0)) {
            known.yApex = known.y0 + (known.vy0**2)/(2*known.g);
            updated = true;
        }

        // tFlight = (vy0 + sqrt(vy0^2 + 2*g*y0)) / g
        if (!isFinite(known.tFlight) && isFinite(known.vy0) && isFinite(known.g) && isFinite(known.y0)) {
            known.tFlight = (known.vy0 + Math.sqrt(known.vy0**2 + 2*known.g*known.y0)) / known.g;
            updated = true;
        }

        // xf = x0 + vx0 * tFlight
        if (!isFinite(known.xf) && isFinite(known.vx0) && isFinite(known.x0) && isFinite(known.tFlight)) {
            known.xf = known.x0 + known.vx0 * known.tFlight;
            updated = true;
        }

        // Add more formulas here for vy(t), vx(t), v(t), angles, etc.
    }

    // 4. Return computed values
    return known;
}


function calculateProjectile() {
    const v0 = parseFloat(document.getElementById("v0").value);
    const vx0 = parseFloat(document.getElementById("vx0").value);
    const vy0 = parseFloat(document.getElementById("vy0").value);
    const vt = parseFloat(document.getElementById("vt").value);
    const vxt = parseFloat(document.getElementById("vxt").value);
    const vyt = parseFloat(document.getElementById("vyt").value);
    const vf = parseFloat(document.getElementById("vf").value);
    const va = parseFloat(document.getElementById("va").value);

    const angle0 = parseFloat(document.getElementById("angle0").value);
    const angleT = parseFloat(document.getElementById("angleT").value);
    const angleFinal = parseFloat(document.getElementById("angleFinal").value);

    const y0 = parseFloat(document.getElementById("y0").value);
    const yt = parseFloat(document.getElementById("yt").value);
    const yf = parseFloat(document.getElementById("yf").value);
    const yApex = parseFloat(document.getElementById("yApex").value);

    const x0 = parseFloat(document.getElementById("x0").value);
    const xt = parseFloat(document.getElementById("xt").value);
    const xf = parseFloat(document.getElementById("xf").value);
    const xApex = parseFloat(document.getElementById("xApex").value);

    const gravityPreset = parseFloat(document.getElementById("gravityPreset").value);

    const tCustom = parseFloat(document.getElementById("tCustom").value);
    const tFlight = parseFloat(document.getElementById("tFlight").value);
    const tApex = parseFloat(document.getElementById("tApex").value);

    const angleRad = angleDeg * Math.PI / 180;
    const vx = v0 * Math.cos(angleRad);
    const vy = v0 * Math.sin(angleRad);

    const totalTime = timeOfFlight(vy, h0, g);
    // const tApex = vy / g;
    const maxHeight = h0 + (vy * vy) / (2 * g);
    const range = vx * totalTime;
    const vyFinal = vy - g * totalTime;
    const vFinal = Math.sqrt(vx * vx + vyFinal * vyFinal);

    // Generate trajectory points
    let trajectory = [];
    const steps = 100;
    for (let i = 0; i <= steps; i++) {
        const t = (i / steps) * totalTime;
        const x = vx * t;
        const y = h0 + vy * t - 0.5 * g * t * t;
        if (y < 0) break;
        trajectory.push({ x, y });
    }

    drawTrajectory(trajectory);

    // Display results
    resultsDiv.innerHTML = `
    <div class="resultLine">
        <p>Time of Flight:</p>
        <p class="resultNumber">${totalTime.toFixed(2)} s</p>
    </div>
    <div class="resultLine">
        <p>Max Height:</p>
        <p class="resultNumber">${maxHeight.toFixed(2)} m</p>
    </div>
    <div class="resultLine">
        <p>Range:</p>
        <p class="resultNumber">${range.toFixed(2)} m</p>
    </div>
    <div class="resultLine">
        <p>Final Velocity:</p>
        <p class="resultNumber">${vFinal.toFixed(2)} m/s</p>
    </div>
    <div class="resultLine">
        <p>Time to Apex:</p>
        <p class="resultNumber">${tApex.toFixed(2)} s</p>
    </div>
  `;

    return { vx, vy, g, h0, trajectory, totalTime };
}

function drawTrajectory(traj) {
    const canvas = document.getElementById("trajectoryCanvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;

    traj.forEach((p, i) => {
        const x = p.x * 5;  // scale factor
        const y = canvas.height - p.y * 5;
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();
}

function drawProjectile(x, y) {
    const canvas = document.getElementById("trajectoryCanvas");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(x * 5, canvas.height - y * 5, 6, 0, Math.PI * 2);
    ctx.fill();
}

function playAnimation() {
    cancelAnimationFrame(animationId); // stop old animation

    const v0 = parseFloat(document.getElementById("velocity").value);
    const angle = parseFloat(document.getElementById("angle").value) * Math.PI / 180;
    const h0 = parseFloat(document.getElementById("height").value);
    const g = parseFloat(document.getElementById("gravity").value);

    const vx = v0 * Math.cos(angle);
    const vy = v0 * Math.sin(angle);

    const totalTime = timeOfFlight(vy, h0, g);
    const steps = 200;
    const dt = totalTime / steps;

    const trajectory = [];
    for (let t = 0; t <= totalTime; t += dt) {
        const x = vx * t;
        const y = h0 + vy * t - 0.5 * g * t * t;
        if (y < 0) break;
        trajectory.push({ x, y });
    }

    let frame = 0;

    function animate() {
        drawTrajectory(trajectory);
        if (frame < trajectory.length) {
            const { x, y } = trajectory[frame];
            drawProjectile(x, y);
            frame++;
            animationId = requestAnimationFrame(animate);
        }
    }
    animate();
}

// Hook up listeners
window.addEventListener("DOMContentLoaded", () => {
    calculateProjectile();
    document.getElementById("playBtn").addEventListener("click", playAnimation);

    document.querySelectorAll(`
            #v0, 
            #vx0, 
            #vy0, 
            #vt,
            #vxt,
            #vyt,
            #vf,
            #va,
            #angle0,
            #angleT,
            #angleFinal,
            #y0,
            #yt,
            #yf,
            #yApex,
            #x0,
            #xt,
            #xf,
            #xApex,
            #gravityPreset,
            #tCustom,
            #tFlight,
            #tApex
            `)
        .forEach(el => {
            el.addEventListener("input", calculateProjectile);
            el.addEventListener("change", calculateProjectile);
        });
});


function showMore(nameOfClass) {
    let list = document.querySelector(`.${nameOfClass}`).classList;
    if(list.contains(`showMore${nameOfClass}`)) {
        list.remove(`showMore${nameOfClass}`)
    } else {
        list.add(`showMore${nameOfClass}`);
    }
}