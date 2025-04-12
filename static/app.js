document.addEventListener("DOMContentLoaded", () => {
  // Canvas setup
  const canvas = document.getElementById("spaceCanvas")
  const ctx = canvas.getContext("2d")

  // Set canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  resizeCanvas()
  window.addEventListener("resize", resizeCanvas)

  // Stars
  const stars = []
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      opacity: Math.random(),
      speed: Math.random() * 0.05,
    })
  }

  // Planets
  const planets = [
    { x: canvas.width * 0.1, y: canvas.height * 0.2, radius: 15, color: "#e6e6e6", speed: 0.2 }, // Mercury
    { x: canvas.width * 0.2, y: canvas.height * 0.3, radius: 25, color: "#f5deb3", speed: 0.15 }, // Venus
    { x: canvas.width * 0.8, y: canvas.height * 0.7, radius: 30, color: "#6b93d6", speed: 0.1 }, // Earth
    { x: canvas.width * 0.7, y: canvas.height * 0.2, radius: 20, color: "#c1440e", speed: 0.12 }, // Mars
    { x: canvas.width * 0.9, y: canvas.height * 0.5, radius: 60, color: "#e3dccb", speed: 0.05 }, // Jupiter
  ]

  // Sun
  const sun = {
    x: canvas.width * 0.5,
    y: canvas.height * 0.5,
    radius: 80,
    glow: 30,
  }

  // Animation
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, "#0a0a2a")
    gradient.addColorStop(1, "#1a1a4a")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw stars
    stars.forEach((star) => {
      ctx.beginPath()
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
      ctx.fill()

      // Move stars
      star.y += star.speed
      if (star.y > canvas.height) {
        star.y = 0
        star.x = Math.random() * canvas.width
      }
    })

    // Draw sun with glow
    const sunGradient = ctx.createRadialGradient(sun.x, sun.y, sun.radius * 0.5, sun.x, sun.y, sun.radius + sun.glow)
    sunGradient.addColorStop(0, "#ffcc00")
    sunGradient.addColorStop(0.5, "#ff6600")
    sunGradient.addColorStop(1, "rgba(255, 0, 0, 0)")

    ctx.beginPath()
    ctx.arc(sun.x, sun.y, sun.radius + sun.glow, 0, Math.PI * 2)
    ctx.fillStyle = sunGradient
    ctx.fill()

    // Draw planets
    planets.forEach((planet) => {
      // Planet orbit
      ctx.beginPath()
      ctx.arc(sun.x, sun.y, Math.sqrt(Math.pow(planet.x - sun.x, 2) + Math.pow(planet.y - sun.y, 2)), 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
      ctx.stroke()

      // Calculate new position
      const angle = Math.atan2(planet.y - sun.y, planet.x - sun.x)
      const distance = Math.sqrt(Math.pow(planet.x - sun.x, 2) + Math.pow(planet.y - sun.y, 2))
      const newAngle = angle + planet.speed * 0.01

      planet.x = sun.x + Math.cos(newAngle) * distance
      planet.y = sun.y + Math.sin(newAngle) * distance

      // Draw planet
      ctx.beginPath()
      ctx.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2)
      ctx.fillStyle = planet.color
      ctx.fill()
    })

    requestAnimationFrame(animate)
  }

  animate()

  // Star information database
  const starInfo = {
    "Brown Dwarf": {
      description:
        "Brown dwarfs are substellar objects that are too low in mass to sustain hydrogen-1 fusion in their cores, which is characteristic of stars on the main sequence. They occupy the mass range between the heaviest gas giant planets and the lightest stars.",
      facts: [
        "Mass: 13-80 times Jupiter's mass",
        "Temperature: 300-2,800 K",
        "Cannot sustain hydrogen fusion",
        "Often emit infrared radiation",
        "Some have strong magnetic fields",
        "Can have planet-like atmospheres",
      ],
    },
    "Red Dwarf": {
      description:
        "Red dwarfs are the smallest and coolest stars on the main sequence. They are the most common type of star in the Milky Way, but due to their low luminosity, none are visible to the naked eye from Earth.",
      facts: [
        "Mass: 0.075-0.5 solar masses",
        "Temperature: 2,500-3,500 K",
        "Extremely long lifespan",
        "Often host potentially habitable planets",
        "Prone to powerful solar flares",
        "Make up about 75% of stars in our galaxy",
      ],
    },
    "White Dwarf": {
      description:
        "White dwarfs are the dense stellar remnants of low and medium mass stars. They are composed mostly of electron-degenerate matter and are supported by quantum mechanical effects rather than thermal pressure.",
      facts: [
        "Mass: 0.17-1.33 solar masses",
        "Size: Similar to Earth",
        "Extremely dense",
        "No longer undergo fusion",
        "Slowly cooling over billions of years",
        "Final evolutionary state for most stars",
      ],
    },
    "Main Sequence": {
      description:
        "Main sequence stars are stars that are fusing hydrogen into helium in their cores. Our Sun is a main sequence star. These stars fall along a diagonal line in the Hertzsprung-Russell diagram.",
      facts: [
        "Most common stage of stellar evolution",
        "Include stars like our Sun",
        "Stable hydrogen fusion in core",
        "Wide range of masses and temperatures",
        "Can remain in this stage for billions of years",
        "Follow mass-luminosity relationship",
      ],
    },
    "Super Giants": {
      description:
        "Supergiants are among the most massive and luminous stars known. They are in a late phase of stellar evolution and have exhausted the hydrogen fuel in their cores.",
      facts: [
        "Mass: 8-70 solar masses",
        "Enormous size and luminosity",
        "Relatively short lifespan",
        "Complex internal structure",
        "May end as supernovae",
        "Rare in the universe",
      ],
    },
    "Hyper Giants": {
      description:
        "Hypergiants are extremely rare and massive stars that exceed even supergiants in size and brightness. They are among the most luminous stars known and are often unstable.",
      facts: [
        "Mass: >70 solar masses",
        "Extreme luminosity and size",
        "Very short lifespans",
        "Highly unstable",
        "Powerful stellar winds",
        "May become pair-instability supernovae",
      ],
    },
  }

  // Function to update star information display
  function updateStarInformation(starType) {
    const info = starInfo[starType]
    if (!info) return

    // Update description
    document.getElementById("starDescription").textContent = info.description

    // Update facts
    const factsList = document.getElementById("starFacts")
    factsList.innerHTML = info.facts.map((fact) => `<li>${fact}</li>`).join("")

    // Show the star info section with animation
    const starInfoSection = document.getElementById("starInfo")
    starInfoSection.style.display = "block"
    starInfoSection.classList.add("animate-fade-in")
  }

  // Form submission handler
  const form = document.getElementById("predictionForm")
  const submitText = document.getElementById("submitText")
  const resultContainer = document.getElementById("resultContainer")
  const predictionElement = document.getElementById("prediction")
  const modelUsedElement = document.getElementById("modelUsed")
  const errorContainer = document.getElementById("errorContainer")
  const errorMessage = document.getElementById("errorMessage")

  // Form submission handler
  form.addEventListener("submit", (event) => {
    event.preventDefault()

    // Hide previous results
    resultContainer.style.display = "none"
    errorContainer.style.display = "none"

    // Show loading state
    submitText.textContent = "Analyzing Stellar Data..."

    // Get selected model type
    const modelType = document.querySelector('input[name="modelType"]:checked').value

    // Get form data
    const formData = {
      temperature: Number.parseFloat(document.getElementById("temperature").value),
      luminosity: Number.parseFloat(document.getElementById("luminosity").value),
      radius: Number.parseFloat(document.getElementById("radius").value),
      magnitude: Number.parseFloat(document.getElementById("magnitude").value),
      starColor: document.getElementById("starColor").value,
      spectralClass: document.getElementById("spectralClass").value,
      modelType: modelType, // Add model type to the request
    }

    fetch("/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Reset button text
        submitText.textContent = "Predict Star Type"

        if (data.error) {
          // Show error
          errorMessage.textContent = data.error
          errorContainer.style.display = "block"
        } else {
          // Show prediction
          predictionElement.textContent = data.prediction

          // Show which model was used
          const modelName = modelType === "voting_classifier" ? "Voting Classifier" : "Random Forest"
          modelUsedElement.textContent = `Predicted using: ${modelName}`

          resultContainer.style.display = "block"

          // Update video source based on prediction
          const videoElement = document.getElementById("starVideo")
          videoElement.src = `/static/videos/${data.prediction.replace(/ /g, "_").toLowerCase()}.mp4`
          videoElement.load()

          // Update star information
          updateStarInformation(data.prediction)
        }
      })
      .catch((error) => {
        // Reset button text
        submitText.textContent = "Predict Star Type"

        // Show error
        errorMessage.textContent = "Unable to fetch prediction. Please try again."
        errorContainer.style.display = "block"
        console.error("Error:", error)
      })
  })

  // Add event listeners for model selection to enhance UI feedback
  const modelOptions = document.querySelectorAll('input[name="modelType"]')
  modelOptions.forEach((option) => {
    option.addEventListener("change", function () {
      // Add visual feedback when model is selected
      const allCards = document.querySelectorAll(".model-card")
      allCards.forEach((card) => {
        card.classList.remove("pulse-animation")
      })

      this.parentElement.querySelector(".model-card").classList.add("pulse-animation")
    })
  })
})

