"use strict";exports.id=187,exports.ids=[187],exports.modules={50187:(e,t,i)=>{i.r(t),i.d(t,{W3mModal:()=>m});var a=i(14243),o=i(108),r=i(61867),s=i(89453),n=i(68652),d=i(89204);let l=(0,a.AH)`
  :host {
    z-index: var(--w3m-z-index);
    display: block;
    backface-visibility: hidden;
    will-change: opacity;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    opacity: 0;
    background-color: var(--wui-cover);
    transition: opacity 0.2s var(--wui-ease-out-power-2);
    will-change: opacity;
  }

  :host(.open) {
    opacity: 1;
  }

  :host(.embedded) {
    position: relative;
    pointer-events: unset;
    background: none;
    width: 100%;
    opacity: 1;
  }

  wui-card {
    max-width: var(--w3m-modal-width);
    width: 100%;
    position: relative;
    animation: zoom-in 0.2s var(--wui-ease-out-power-2);
    animation-fill-mode: backwards;
    outline: none;
    transition:
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: border-radius, background-color;
  }

  :host(.embedded) wui-card {
    max-width: 400px;
  }

  wui-card[shake='true'] {
    animation:
      zoom-in 0.2s var(--wui-ease-out-power-2),
      w3m-shake 0.5s var(--wui-ease-out-power-2);
  }

  wui-flex {
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  @media (max-height: 700px) and (min-width: 431px) {
    wui-flex {
      align-items: flex-start;
    }

    wui-card {
      margin: var(--wui-spacing-xxl) 0px;
    }
  }

  @media (max-width: 430px) {
    wui-flex {
      align-items: flex-end;
    }

    wui-card {
      max-width: 100%;
      border-bottom-left-radius: var(--local-border-bottom-mobile-radius);
      border-bottom-right-radius: var(--local-border-bottom-mobile-radius);
      border-bottom: none;
      animation: slide-in 0.2s var(--wui-ease-out-power-2);
    }

    wui-card[shake='true'] {
      animation:
        slide-in 0.2s var(--wui-ease-out-power-2),
        w3m-shake 0.5s var(--wui-ease-out-power-2);
    }
  }

  @keyframes zoom-in {
    0% {
      transform: scale(0.95) translateY(0);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes slide-in {
    0% {
      transform: scale(1) translateY(50px);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes w3m-shake {
    0% {
      transform: scale(1) rotate(0deg);
    }
    20% {
      transform: scale(1) rotate(-1deg);
    }
    40% {
      transform: scale(1) rotate(1.5deg);
    }
    60% {
      transform: scale(1) rotate(-1.5deg);
    }
    80% {
      transform: scale(1) rotate(1deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
    }
  }

  @keyframes w3m-view-height {
    from {
      height: var(--prev-height);
    }
    to {
      height: var(--new-height);
    }
  }
`;var c=function(e,t,i,a){var o,r=arguments.length,s=r<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,a);else for(var n=e.length-1;n>=0;n--)(o=e[n])&&(s=(r<3?o(s):r>3?o(t,i,s):o(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let h="scroll-lock",m=class extends a.WF{constructor(){super(),this.unsubscribe=[],this.abortController=void 0,this.hasPrefetched=!1,this.enableEmbedded=n.Hd.state.enableEmbedded,this.open=n.W3.state.open,this.caipAddress=n.WB.state.activeCaipAddress,this.caipNetwork=n.WB.state.activeCaipNetwork,this.shake=n.W3.state.shake,this.initializeTheming(),n.Np.prefetchAnalyticsConfig(),this.unsubscribe.push(n.W3.subscribeKey("open",e=>e?this.onOpen():this.onClose()),n.W3.subscribeKey("shake",e=>this.shake=e),n.WB.subscribeKey("activeCaipNetwork",e=>this.onNewNetwork(e)),n.WB.subscribeKey("activeCaipAddress",e=>this.onNewAddress(e)),n.Hd.subscribeKey("enableEmbedded",e=>this.enableEmbedded=e))}firstUpdated(){if(n.$m.fetchNetworkImage(this.caipNetwork?.assets?.imageId),this.caipAddress){if(this.enableEmbedded){n.W3.close(),this.prefetch();return}this.onNewAddress(this.caipAddress)}this.open&&this.onOpen(),this.enableEmbedded&&this.prefetch()}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),this.onRemoveKeyboardListener()}render(){return(this.style.cssText=`
      --local-border-bottom-mobile-radius: ${this.enableEmbedded?"clamp(0px, var(--wui-border-radius-l), 44px)":"0px"};
    `,this.enableEmbedded)?(0,a.qy)`${this.contentTemplate()}
        <w3m-tooltip></w3m-tooltip> `:this.open?(0,a.qy)`
          <wui-flex @click=${this.onOverlayClick.bind(this)} data-testid="w3m-modal-overlay">
            ${this.contentTemplate()}
          </wui-flex>
          <w3m-tooltip></w3m-tooltip>
        `:null}contentTemplate(){return(0,a.qy)` <wui-card
      shake="${this.shake}"
      data-embedded="${(0,r.J)(this.enableEmbedded)}"
      role="alertdialog"
      aria-modal="true"
      tabindex="0"
      data-testid="w3m-modal-card"
    >
      <w3m-header></w3m-header>
      <w3m-router></w3m-router>
      <w3m-snackbar></w3m-snackbar>
      <w3m-alertbar></w3m-alertbar>
    </wui-card>`}async onOverlayClick(e){e.target===e.currentTarget&&await this.handleClose()}async handleClose(){"UnsupportedChain"===n.IN.state.view||await n.UG.isSIWXCloseDisabled()?n.W3.shake():n.W3.close()}initializeTheming(){let{themeVariables:e,themeMode:t}=n.Wn.state,i=d.UiHelperUtil.getColorTheme(t);(0,d.initializeTheming)(e,i)}onClose(){this.open=!1,this.classList.remove("open"),this.onScrollUnlock(),n.Pt.hide(),this.onRemoveKeyboardListener()}onOpen(){this.prefetch(),this.open=!0,this.classList.add("open"),this.onScrollLock(),this.onAddKeyboardListener()}onScrollLock(){let e=document.createElement("style");e.dataset.w3m=h,e.textContent=`
      body {
        touch-action: none;
        overflow: hidden;
        overscroll-behavior: contain;
      }
      w3m-modal {
        pointer-events: auto;
      }
    `,document.head.appendChild(e)}onScrollUnlock(){let e=document.head.querySelector(`style[data-w3m="${h}"]`);e&&e.remove()}onAddKeyboardListener(){this.abortController=new AbortController;let e=this.shadowRoot?.querySelector("wui-card");e?.focus(),window.addEventListener("keydown",t=>{if("Escape"===t.key)this.handleClose();else if("Tab"===t.key){let{tagName:i}=t.target;!i||i.includes("W3M-")||i.includes("WUI-")||e?.focus()}},this.abortController)}onRemoveKeyboardListener(){this.abortController?.abort(),this.abortController=void 0}async onNewAddress(e){let t=n.WB.state.isSwitchingNamespace,i=n.wE.getPlainAddress(e);i||t?t&&i&&n.IN.goBack():n.W3.close(),await n.UG.initializeIfEnabled(),this.caipAddress=e,n.WB.setIsSwitchingNamespace(!1)}onNewNetwork(e){n.$m.fetchNetworkImage(e?.assets?.imageId);let t=this.caipNetwork?.caipNetworkId?.toString(),i=e?.caipNetworkId?.toString(),a=n.WB.state.isSwitchingNamespace,o=this.caipNetwork?.name===s.oU.UNSUPPORTED_NETWORK_NAME,r="ConnectingExternal"===n.IN.state.view,d=!this.caipAddress,l="UnsupportedChain"===n.IN.state.view;!r&&(d||l||t&&i&&t!==i&&!o&&!a)&&n.IN.goBack(),this.caipNetwork=e}prefetch(){this.hasPrefetched||(this.hasPrefetched=!0,n.Np.prefetch())}};m.styles=l,c([(0,o.MZ)({type:Boolean})],m.prototype,"enableEmbedded",void 0),c([(0,o.wk)()],m.prototype,"open",void 0),c([(0,o.wk)()],m.prototype,"caipAddress",void 0),c([(0,o.wk)()],m.prototype,"caipNetwork",void 0),c([(0,o.wk)()],m.prototype,"shake",void 0),m=c([(0,d.customElement)("w3m-modal")],m)}};