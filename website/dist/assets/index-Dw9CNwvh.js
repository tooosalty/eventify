(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function e(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=e(i);fetch(i.href,o)}})();const a=[{id:"tech-summit-2024",title:"Tech Summit 2024",date:"2024-03-15",location:"Silicon Valley Convention Center",price:299,category:"tech",image:"https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",description:"Join industry leaders and innovators at the biggest tech conference of the year. Featuring keynotes, workshops, and networking opportunities with the brightest minds in technology.",highlights:["Keynote speeches from tech industry leaders","Hands-on workshops on AI and Machine Learning","Networking sessions with industry professionals","Product launches and demonstrations"]},{id:"summer-music-festival",title:"Summer Music Festival",date:"2024-07-20",location:"Central Park Amphitheater",price:149,category:"music",image:"https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800",description:"Experience three days of non-stop music featuring top artists from around the world. Multiple stages, food vendors, and unforgettable performances under the summer sky.",highlights:["Multiple stages featuring different genres","International food court","Camping facilities available","Art installations and interactive experiences"]},{id:"digital-art-expo",title:"Digital Art Expo",date:"2024-05-12",location:"Modern Art Gallery",price:45,category:"arts",image:"https://images.unsplash.com/photo-1573152958734-1922c188fba3?w=800",description:"Explore the intersection of art and technology at this cutting-edge digital art exhibition. Experience immersive installations, VR art, and interactive digital sculptures.",highlights:["Virtual Reality art experiences","Interactive digital installations","Artist talks and demonstrations","Digital art workshops"]},{id:"championship-finals",title:"Basketball Championship Finals",date:"2024-06-30",location:"National Sports Arena",price:199,category:"sports",image:"https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800",description:"Witness the ultimate showdown in basketball as top teams compete for the championship title. Experience the thrill, drama, and excitement of professional basketball at its finest.",highlights:["VIP seating options","Pre-game entertainment","Exclusive merchandise","Meet and greet opportunities"]},{id:"ai-conference",title:"AI & Future Tech Conference",date:"2024-09-25",location:"Innovation Hub",price:399,category:"tech",image:"https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",description:"Delve into the future of artificial intelligence and emerging technologies. Connect with AI researchers, industry experts, and innovative startups.",highlights:["AI research presentations","Robot demonstrations","Machine learning workshops","Startup pitch competitions"]},{id:"jazz-night",title:"International Jazz Festival",date:"2024-08-15",location:"City Jazz Club",price:89,category:"music",image:"https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800",description:"An evening of smooth jazz featuring international artists. Experience the magic of live jazz music in an intimate setting.",highlights:["International jazz artists","Wine and dining experience","Intimate venue setting","Late night jam sessions"]},{id:"modern-art-exhibition",title:"Contemporary Art Show",date:"2024-04-18",location:"Metropolitan Gallery",price:35,category:"arts",image:"https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=800",description:"Discover contemporary masterpieces from emerging and established artists. This exhibition showcases innovative works that challenge traditional perspectives.",highlights:["Curated collection of modern art","Artist meet-and-greets","Live art demonstrations","Exclusive gallery tours"]},{id:"soccer-tournament",title:"International Soccer Cup",date:"2024-07-10",location:"City Stadium",price:149,category:"sports",image:"https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800",description:"Watch top international soccer teams compete in this prestigious tournament. Experience world-class soccer and support your favorite team.",highlights:["International teams","Stadium food and beverages","Fan zones and activities","Live commentary"]},{id:"startup-summit",title:"Startup Innovation Summit",date:"2024-10-05",location:"Business Convention Center",price:249,category:"tech",image:"https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800",description:"Connect with successful entrepreneurs, investors, and innovators. Learn about the latest trends in startups and technology.",highlights:["Startup pitching sessions","Investor networking","Innovation workshops","Mentoring sessions"]},{id:"rock-concert",title:"Rock Music Festival",date:"2024-08-30",location:"Freedom Park",price:129,category:"music",image:"https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800",description:"A day of non-stop rock music featuring both legendary bands and emerging artists. Experience the energy of live rock performances.",highlights:["Multiple performance stages","Food and drink vendors","Meet and greet opportunities","Exclusive merchandise"]}];function w(){return Math.floor(Math.random()*50)+10}function b(){const t=document.getElementById("featuredEvents");if(!t)return;const e=[...a].sort(()=>.5-Math.random()).slice(0,3);t.innerHTML=e.map(s=>`
        <div class="event-card">
            <div class="event-image-container">
                <img src="${s.image}" alt="${s.title}">
            </div>
            <div class="event-info">
                <span class="category-tag">${s.category}</span>
                <h3>${s.title}</h3>
                <p class="event-date">📅 ${new Date(s.date).toLocaleDateString()}</p>
                <p class="event-location">📍 ${s.location}</p>
                <p class="event-price">💰 $${s.price}</p>
                <a href="/website/src/pages/event-details.html?id=${s.id}" class="view-details-button">View Details</a>
            </div>
        </div>
    `).join("")}function E(){const t=document.getElementById("upcomingEvents");if(!t)return;const n=[a.find(e=>e.id==="tech-summit-2024"),a.find(e=>e.id==="summer-music-festival"),a.find(e=>e.id==="digital-art-expo"),a.find(e=>e.id==="championship-finals"),a.find(e=>e.id==="ai-conference")].filter(Boolean);t.innerHTML=n.map(e=>{const s=new Date(e.date);return`
            <div class="timeline-event">
                <div class="timeline-date">
                    <div class="day">${s.getDate()}</div>
                    <div class="month">${s.toLocaleString("default",{month:"short"})}</div>
                </div>
                <div class="timeline-content">
                    <h3>${e.title}</h3>
                    <div class="timeline-meta">
                        <span>📍 ${e.location}</span>
                        <span>🎫 ${w()} seats left</span>
                        <span>🏷️ ${e.category}</span>
                    </div>
                    <p class="timeline-description">${e.description.substring(0,150)}...</p>
                    <div class="timeline-actions">
                        <div class="timeline-price">$${e.price}</div>
                        <a href="/website/src/pages/event-details.html?id=${e.id}" class="view-details-button">
                            View Details
                        </a>
                    </div>
                </div>
            </div>
        `}).join(""),document.querySelectorAll(".timeline-event").forEach((e,s)=>{setTimeout(()=>{e.classList.add("animate")},s*200)})}function L(){const t=document.querySelectorAll(".hero-slide"),n=document.getElementById("prevSlide"),e=document.getElementById("nextSlide");let s=0;function i(o){t.forEach(r=>r.classList.remove("active")),s=(o+t.length)%t.length,t[s].classList.add("active")}n==null||n.addEventListener("click",()=>i(s-1)),e==null||e.addEventListener("click",()=>i(s+1)),setInterval(()=>i(s+1),5e3)}document.addEventListener("DOMContentLoaded",()=>{b(),E(),L()});fetch("http://localhost/Eventify/get_events.php").then(t=>t.json()).then(t=>{const n=document.getElementById("featuredEvents");t.forEach(e=>{const s=`
              <div class="event-card">
                  <h3>${e.EventName}</h3>
                  <p>${e.Description}</p>
                  <p>Date: ${e.Date} | Price: $${e.Price}</p>
              </div>
          `;n.innerHTML+=s})}).catch(t=>console.error("Error fetching events:",t));function u(t){const n=document.querySelector(".login-link"),e=document.querySelector(".profile-link"),s=document.querySelector(".logout-btn");t?(n==null||n.classList.add("hidden"),e==null||e.classList.remove("hidden"),s==null||s.classList.remove("hidden")):(n==null||n.classList.remove("hidden"),e==null||e.classList.add("hidden"),s==null||s.classList.add("hidden"))}async function S(){try{const n=await(await fetch("/website/src/php/check_session.php")).json();u(n.loggedIn)}catch{u(!1)}}function I(t){let n=0;return t.length>=8&&n++,t.match(/[a-z]/)&&t.match(/[A-Z]/)&&n++,t.match(/\d/)&&n++,t.match(/[^a-zA-Z\d]/)&&n++,n}function x(t,n,e){const s=I(t),i=["Weak","Moderate","Strong","Very Strong"];n.style.width=`${s/4*100}%`,e.textContent=i[s-1]||"Too Short"}function C(t){let n=!0;return t.querySelectorAll(".form-group").forEach(e=>{const s=e.querySelector("input"),i=e.querySelector(".error-message");if(i&&i.remove(),e.classList.remove("error","success"),s.value)if(s.type==="email"&&!s.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){e.classList.add("error");const o=document.createElement("span");o.className="error-message",o.textContent="Please enter a valid email address",e.appendChild(o),n=!1}else if(s.type==="password"&&s.value.length<8){e.classList.add("error");const o=document.createElement("span");o.className="error-message",o.textContent="Password must be at least 8 characters long",e.appendChild(o),n=!1}else e.classList.add("success");else{e.classList.add("error");const o=document.createElement("span");o.className="error-message",o.textContent="This field is required",e.appendChild(o),n=!1}}),n}const p=document.getElementById("loginForm");p&&p.addEventListener("submit",async t=>{t.preventDefault();const n=document.getElementById("email").value.trim(),e=document.getElementById("password").value.trim();if(!n||!e){alert("Email and password are required.");return}try{const s=await fetch("/website/src/php/login.php",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:`email=${encodeURIComponent(n)}&password=${encodeURIComponent(e)}`}),i=await s.json();s.ok?(console.log("Redirecting to:",i.redirect),window.location.href=i.redirect||"/website/src/pages/dashboard.html"):alert(i.error||"Login failed.")}catch(s){console.error("Error during login:",s),alert("An unexpected error occurred. Please try again.")}});const l=document.getElementById("registerForm");l&&l.addEventListener("submit",async t=>{t.preventDefault();const n=document.getElementById("regName").value.trim(),e=document.getElementById("regEmail").value.trim(),s=document.getElementById("regPassword").value.trim();if(C(l))try{const i=await fetch("/website/src/php/register.php",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:`name=${encodeURIComponent(n)}&email=${encodeURIComponent(e)}&password=${encodeURIComponent(s)}`}),o=await i.json();i.ok?(alert(o.message),window.location.href="/website/src/pages/login.html"):alert(`Error: ${o.error}`)}catch(i){console.error("Error during registration:",i),alert("An unexpected error occurred. Please try again.")}});const $=document.querySelectorAll('input[type="password"]');$.forEach(t=>{const n=t.parentElement.querySelector(".password-strength-bar"),e=t.parentElement.querySelector(".strength-feedback");n&&e&&t.addEventListener("input",()=>{x(t.value,n,e)})});const d=document.getElementById("showRegister"),m=document.getElementById("showLogin"),f=document.querySelector(".auth-box"),g=document.getElementById("registerBox");d==null||d.addEventListener("click",t=>{t.preventDefault(),f.classList.add("hidden"),g.classList.remove("hidden")});m==null||m.addEventListener("click",t=>{t.preventDefault(),g.classList.add("hidden"),f.classList.remove("hidden")});const h=document.querySelector(".logout-btn");h==null||h.addEventListener("click",async()=>{if(confirm("Are you sure you want to log out?"))try{await fetch("/website/src/php/logout.php",{method:"POST"}),window.location.href="/index.html"}catch(t){alert("Logout failed: "+t.message)}});S();const A={threshold:.1,rootMargin:"0px 0px -50px 0px"},v=new IntersectionObserver(t=>{t.forEach(n=>{n.isIntersecting&&(n.target.classList.add("animate-fade-in"),v.unobserve(n.target))})},A);function k(){document.querySelectorAll(".scroll-animate").forEach(n=>v.observe(n))}function M(){const t=document.querySelector(".navbar");let n=0;window.addEventListener("scroll",()=>{const e=window.pageYOffset;if(e<=0){t.classList.remove("navbar-hidden"),t.classList.remove("navbar-shadow");return}e>n&&!t.classList.contains("navbar-hidden")?t.classList.add("navbar-hidden"):e<n&&t.classList.contains("navbar-hidden")&&t.classList.remove("navbar-hidden"),t.classList.add("navbar-shadow"),n=e})}document.addEventListener("DOMContentLoaded",()=>{k(),M()});async function q(){try{let t=document.getElementById("footer-container");t||(t=document.createElement("div"),t.id="footer-container",document.body.appendChild(t));const n=await fetch("/website/src/components/footer.html");if(!n.ok)throw new Error(`HTTP error! status: ${n.status}`);const e=await n.text();t.innerHTML=e;const s=document.querySelectorAll(".footer-section");if(s.length>0){const o=new IntersectionObserver(r=>{r.forEach((c,y)=>{c.isIntersecting&&(setTimeout(()=>{c.target.classList.add("animate")},y*200),o.unobserve(c.target))})},{threshold:.2,rootMargin:"0px 0px -50px 0px"});s.forEach(r=>o.observe(r))}else console.warn("No footer sections found for animations.");const i=document.querySelector(".newsletter-form");i?i.addEventListener("submit",o=>{o.preventDefault(),i.querySelector(".newsletter-input").value?(alert("Thank you for subscribing to our newsletter!"),i.reset()):alert("Please enter a valid email address.")}):console.warn("Newsletter form not found in the footer.")}catch(t){console.error("Error loading footer:",t);let n=document.getElementById("footer-container");n&&(n.innerHTML="<p>Failed to load footer. Please try again later.</p>")}}document.addEventListener("DOMContentLoaded",q);function D(){const t=document.querySelectorAll(".footer-section"),n=new IntersectionObserver(e=>{e.forEach((s,i)=>{s.isIntersecting&&(setTimeout(()=>{s.target.classList.add("animate")},i*200),n.unobserve(s.target))})},{threshold:.2,rootMargin:"0px 0px -50px 0px"});t.forEach(e=>n.observe(e))}function P(){const t=document.querySelector(".newsletter-form");t&&t.addEventListener("submit",n=>{n.preventDefault();const e=t.querySelector(".newsletter-input").value;console.log("Newsletter subscription:",e),alert("Thank you for subscribing to our newsletter!"),t.reset()})}document.addEventListener("DOMContentLoaded",()=>{D(),P()});
//# sourceMappingURL=index-Dw9CNwvh.js.map
