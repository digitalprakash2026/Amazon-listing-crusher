const form = document.getElementById('objection-form');
const outputContainer = document.getElementById('output');
const placeholder = document.getElementById('placeholder');
const generateBtn = document.getElementById('generate-btn');
const buttonLabel = generateBtn.querySelector('.btn-label');

const appState = {
  userInput: {
    productName: '',
    productPrice: '',
    usp: '',
    targetAudience: '',
    objectionCategory: 'Price'
  },
  responses: []
};

const responseBlueprints = {
  Price: [
    {
      title: 'Empathy First Approach',
      body: ({ productName, productPrice, usp }) =>
        `Totally fair question—budget matters. ${productName} is priced at ${productPrice}, but the real value is ${usp}. Most buyers recover that investment quickly because it cuts wasted effort and improves results within the first few weeks.`
    },
    {
      title: 'ROI Breakdown',
      body: ({ productName, targetAudience, usp }) =>
        `For ${targetAudience}, the key is return, not just sticker price. ${productName} helps by ${usp}, which often saves enough time and missed opportunities to pay for itself month over month.`
    },
    {
      title: 'Risk Reversal Close',
      body: ({ productName }) =>
        `If ${productName} doesn't create a measurable improvement for your workflow, it's not the right fit—and that's okay. The goal is simple: reduce risk, prove value fast, and keep only what works.`
    }
  ],
  Trust: [
    {
      title: 'Proof & Credibility',
      body: ({ productName, targetAudience }) =>
        `Great question. Teams similar to ${targetAudience} choose ${productName} because it provides clear outcomes, transparent workflows, and consistent support instead of hype.`
    },
    {
      title: 'Transparency Statement',
      body: ({ productName, productPrice }) =>
        `With ${productName}, what you see is what you get: clear pricing at ${productPrice}, clear deliverables, and no hidden complexity. That's how we build long-term trust.`
    },
    {
      title: 'Low-Risk Next Step',
      body: ({ productName }) =>
        `You don't need to commit blindly. Start with a focused use case inside ${productName}, evaluate the results, and scale only when you're confident.`
    }
  ],
  'Time/Procrastination': [
    {
      title: 'Time-Saving Framing',
      body: ({ productName, usp }) =>
        `I hear you—time is tight. ${productName} was designed for busy teams, and ${usp}. That means less setup, fewer manual tasks, and faster momentum.`
    },
    {
      title: 'Momentum Trigger',
      body: ({ targetAudience }) =>
        `For ${targetAudience}, waiting usually costs more than starting small today. A quick first win now creates momentum and makes every next step easier.`
    },
    {
      title: 'Simple 10-Minute Start',
      body: ({ productName }) =>
        `Let's keep this easy: spend 10 minutes setting up one workflow in ${productName}. You'll immediately see what's automated and what time you get back.`
    }
  ],
  'Feature Doubt': [
    {
      title: 'Need-to-Outcome Mapping',
      body: ({ productName, usp }) =>
        `Totally valid to ask about features. The strongest part of ${productName} is not just what it has—it's that ${usp}, which directly improves your day-to-day performance.`
    },
    {
      title: 'Use-Case Specific Reassurance',
      body: ({ targetAudience, productName }) =>
        `${productName} works best when mapped to your exact workflow. For ${targetAudience}, we focus on practical features that shorten execution cycles and remove bottlenecks.`
    },
    {
      title: 'Feature Validation Prompt',
      body: ({ productName }) =>
        `Let's validate this together: share the one capability you need most, and we'll confirm how ${productName} handles it with a concrete example.`
    }
  ],
  'Competitor Comparison': [
    {
      title: 'Respectful Contrast',
      body: ({ productName, usp }) =>
        `Great comparison. Alternatives may look similar on paper, but ${productName} stands out because ${usp}, which creates a more reliable day-to-day advantage.`
    },
    {
      title: 'Decision Criteria Reset',
      body: ({ targetAudience, productName }) =>
        `Instead of comparing feature lists, compare outcomes for ${targetAudience}. ${productName} is built to improve speed, clarity, and conversion quality where it matters most.`
    },
    {
      title: 'Pilot-Based Comparison',
      body: ({ productName }) =>
        `Fastest way to decide: run a short pilot with ${productName} against your current option, then measure response quality, time saved, and confidence of your team.`
    }
  ]
};

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const formData = new FormData(form);
  appState.userInput = {
    productName: String(formData.get('productName') || '').trim(),
    productPrice: String(formData.get('productPrice') || '').trim(),
    usp: String(formData.get('usp') || '').trim(),
    targetAudience: String(formData.get('targetAudience') || '').trim(),
    objectionCategory: String(formData.get('objectionCategory') || 'Price')
  };

  setLoadingState(true);

  try {
    appState.responses = await mockGenerateResponses(appState.userInput);
    renderResponses(appState.responses);
  } catch (error) {
    renderError(error);
  } finally {
    setLoadingState(false);
  }
});

function setLoadingState(isLoading) {
  generateBtn.disabled = isLoading;
  buttonLabel.textContent = isLoading ? 'Crushing objections...' : 'Crush the Objection';
}

function mockGenerateResponses(userInput) {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      const selectedBlueprints = responseBlueprints[userInput.objectionCategory] || responseBlueprints.Price;

      const generated = selectedBlueprints.map((item, index) => ({
        id: `${Date.now()}-${index}`,
        title: item.title,
        body: item.body(userInput)
      }));

      resolve(generated);
    }, 2000);
  });
}

function renderResponses(responses) {
  if (placeholder) {
    placeholder.remove();
  }

  outputContainer.innerHTML = '';

  responses.forEach((response) => {
    const card = document.createElement('article');
    card.className =
      'response-card rounded-xl border border-neutral-700 bg-neutral-950/70 p-4 sm:p-5';

    card.innerHTML = `
      <div class="mb-3 flex items-center justify-between gap-3">
        <h3 class="text-sm font-semibold text-neutral-100 sm:text-base">${escapeHtml(response.title)}</h3>
        <button
          type="button"
          data-share-id="${response.id}"
          class="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-700 bg-neutral-900 text-neutral-300 transition hover:text-white"
          aria-label="Share response"
          title="Share"
        >
          <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <path d="M8.6 13.5 15.4 17.5M15.4 6.5 8.6 10.5" />
          </svg>
        </button>
      </div>
      <p class="mb-4 text-sm leading-6 text-neutral-300">${escapeHtml(response.body)}</p>
      <button
        type="button"
        data-copy-id="${response.id}"
        class="inline-flex items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs font-medium text-neutral-200 transition hover:border-neutral-500 hover:text-white"
      >
        <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8">
          <rect x="9" y="9" width="11" height="11" rx="2" />
          <path d="M5 15V6a2 2 0 0 1 2-2h9" />
        </svg>
        Copy
      </button>
    `;

    outputContainer.appendChild(card);
  });
}

function renderError(error) {
  outputContainer.innerHTML = `
    <div class="rounded-xl border border-red-500/50 bg-red-900/20 p-4 text-sm text-red-200">
      Something went wrong while generating responses. Please try again. <br />
      <span class="text-red-300/90">${escapeHtml(error.message || 'Unknown error')}</span>
    </div>
  `;
}

outputContainer.addEventListener('click', async (event) => {
  const copyTarget = event.target.closest('[data-copy-id]');
  const shareTarget = event.target.closest('[data-share-id]');

  if (copyTarget) {
    const response = appState.responses.find((item) => item.id === copyTarget.dataset.copyId);
    if (!response) return;

    await copyText(response.body, copyTarget);
  }

  if (shareTarget) {
    const response = appState.responses.find((item) => item.id === shareTarget.dataset.shareId);
    if (!response) return;

    await shareResponse(response);
  }
});

async function copyText(text, button) {
  try {
    await navigator.clipboard.writeText(text);
    const previous = button.textContent;
    button.textContent = 'Copied!';
    window.setTimeout(() => {
      button.textContent = previous;
    }, 1400);
  } catch {
    alert('Copy failed. Please copy manually.');
  }
}

async function shareResponse(response) {
  const payload = {
    title: response.title,
    text: response.body
  };

  try {
    if (navigator.share) {
      await navigator.share(payload);
    } else {
      await navigator.clipboard.writeText(`${response.title}\n\n${response.body}`);
      alert('Share is not supported on this browser. The response was copied instead.');
    }
  } catch {
    // User canceled share or browser blocked; silently ignore for smooth UX.
  }
}

function escapeHtml(input) {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
