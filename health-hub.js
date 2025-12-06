document.addEventListener('DOMContentLoaded', function() {
  // Journey Tracker Logic
  const stageButtons = document.querySelectorAll('.journey-tracker-stages .stage-button');
  const progressFill = document.querySelector('.progress-fill');
  const milestones = document.querySelectorAll('.progress-milestones .milestone');
  const storyCards = document.querySelectorAll('.story-feed-grid .story-card');

  function updateJourneyTracker(selectedStage) {
    // Update active stage button
    stageButtons.forEach(button => {
      if (button.dataset.stage === selectedStage) {
        button.classList.add('active');
        button.setAttribute('aria-selected', 'true');
      } else {
        button.classList.remove('active');
        button.setAttribute('aria-selected', 'false');
      }
    });

    // Update progress visualization
    let progressWidth = 0;
    let activeMilestoneIndex = 0;
    switch (selectedStage) {
      case 'starting-out':
        progressWidth = 0;
        activeMilestoneIndex = 0;
        break;
      case 'week-1-4':
        progressWidth = 33;
        activeMilestoneIndex = 1;
        break;
      case 'plateau-breaker':
        progressWidth = 66;
        activeMilestoneIndex = 2;
        break;
      case 'maintaining':
        progressWidth = 100;
        activeMilestoneIndex = 3;
        break;
    }
    progressFill.style.width = `${progressWidth}%`;

    milestones.forEach((milestone, index) => {
      if (index <= activeMilestoneIndex) {
        milestone.classList.add('active');
      } else {
        milestone.classList.remove('active');
      }
    });

    // Dynamically surface content
    storyCards.forEach(card => {
      if (card.dataset.stage === selectedStage) {
        card.style.display = 'flex'; // Show relevant cards
      } else {
        card.style.display = 'none'; // Hide others
      }
    });
  }

  stageButtons.forEach(button => {
    button.addEventListener('click', function() {
      updateJourneyTracker(this.dataset.stage);
    });
  });

  // Initialize tracker with 'starting-out'
  updateJourneyTracker('starting-out');

  // Real-Time Support Ticker Logic
  const tickerMessagesContainer = document.querySelector('.ticker-messages');
  const messages = [
    "Sarah just lost 2kg this week! 🎉",
    "Our prescriber answered a question about nausea. 💬",
    "45 people reading about Mounjaro right now. 📈",
    "New quick tip: 'Hydration Hacks for Weight Loss.' 💧",
    "John hit his 1-month goal! Keep going! 💪"
  ];

  // Duplicate messages to create a seamless loop
  messages.forEach(msgText => {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('ticker-message');
    msgDiv.textContent = msgText;
    tickerMessages.appendChild(msgDiv);
  });
  // Duplicate again to ensure enough content for seamless loop
  messages.forEach(msgText => {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('ticker-message');
    msgDiv.textContent = msgText;
    tickerMessages.appendChild(msgDiv);
  });

  // Apply CSS animation for continuous scroll
  // The animation is now defined in CSS, JS just ensures content is ready.


  // "Save to my journey" Feature
  const saveButtons = document.querySelectorAll('.save-journey-btn');
  saveButtons.forEach(button => {
    button.addEventListener('click', function() {
      this.classList.toggle('saved');
      const message = this.classList.contains('saved') ? 'Saved to your journey!' : 'Removed from journey.';
      // In a real app, this would send data to a backend
      console.log(message); 
      // Optional: show a small toast notification
    });
  });

  // Before/After Slider Logic (for success stories)
  document.querySelectorAll('.story-image-slider').forEach(sliderWrapper => {
    const sliderControl = sliderWrapper.querySelector('.slider-control');
    const sliderAfter = sliderWrapper.querySelector('.slider-after');

    if (sliderControl && sliderAfter) {
      sliderControl.addEventListener('input', (e) => {
        sliderAfter.style.width = `${e.target.value}%`;
      });
    }
  });

  // Interactive Calculator (simplified for demonstration)
  const maintainWeightInput = document.getElementById('maintain-weight');
  const maintainCaloriesDisplay = document.getElementById('maintain-calories');
  const calculateButton = document.querySelector('.calculator-widget-embed .primary-cta');

  if (calculateButton) {
    calculateButton.addEventListener('click', function() {
      const weight = parseFloat(maintainWeightInput.value);
      if (!isNaN(weight) && weight > 0) {
        // Simple BMR approximation for demonstration (e.g., weight * 25 for maintenance)
        const estimatedCalories = Math.round(weight * 25); 
        maintainCaloriesDisplay.textContent = estimatedCalories;
      } else {
        maintainCaloriesDisplay.textContent = 'N/A';
      }
    });
  }

  // Quick Tip Story Card Interactions (TikTok-style "Swipe")
  document.querySelectorAll('.story-card-quick-tip').forEach(card => {
    const frames = card.querySelectorAll('.story-frame');
    const progressDots = card.querySelectorAll('.progress-dot');
    const nextButtons = card.querySelectorAll('.frame-nav-btn.next');
    const prevButtons = card.querySelectorAll('.frame-nav-btn.prev');
    let currentFrameIndex = 0;

    function updateFrameDisplay() {
      frames.forEach((frame, index) => {
        if (index === currentFrameIndex) {
          frame.classList.add('active');
          frame.classList.remove('prev-active'); // Ensure it's not marked as previous
        } else if (index < currentFrameIndex) {
          frame.classList.remove('active');
          frame.classList.add('prev-active'); // Mark as previous for transition
        } else {
          frame.classList.remove('active', 'prev-active');
        }
      });

      progressDots.forEach((dot, index) => {
        if (index === currentFrameIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    nextButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent card click from interfering
        if (currentFrameIndex < frames.length - 1) {
          currentFrameIndex++;
          updateFrameDisplay();
        }
      });
    });

    prevButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent card click from interfering
        if (currentFrameIndex > 0) {
          currentFrameIndex--;
          updateFrameDisplay();
        }
      });
    });

    // Initialize first frame
    updateFrameDisplay();
  });
});
