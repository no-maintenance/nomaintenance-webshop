/* pinterest wrapper */

declare global {
  interface Window {
    pintrk: () => void;
  }
}
let initialized = false;
let debug = false;

const verifyInit = () => {
  if (!initialized) {
    console.warn(
      'Pixel not initialized before using call ReactPixel.init with required params',
    );
  }
  return initialized;
};

const log = (...args) => {
  console.info(...['[pinterest-tracking]'].concat(args));
};

//
const defaultOptions = {
  debug: false,
};

export default {
  init(uniqueTagId, userEmail, options = defaultOptions) {
    const em = {
      em: userEmail,
    };
    // @ts-ignore
    !(function (e) {
      if (!window.pintrk) {
        window.pintrk = function () {
          window.pintrk.queue.push(Array.prototype.slice.call(arguments));
        };
        const n = window.pintrk;
        (n.queue = []), (n.version = '3.0');
        const t = document.createElement('script');
        (t.async = !0), (t.src = e);
        const r = document.getElementsByTagName('script')[0];
        r.parentNode.insertBefore(t, r);
      }
    })('https://s.pinimg.com/ct/core.js');

    if (!uniqueTagId) {
      console.warn('Please insert unique Tag id for initializing');
    } else {
      pintrk('load', uniqueTagId, userEmail ? em : {});

      initialized = true;
      debug = options.debug;
    }
  },

  pageView() {
    if (!verifyInit()) {
      return;
    }

    pintrk('page');

    if (debug) {
      log("called pintrk('page');");
    }
  },

  track(title, data) {
    if (!verifyInit()) {
      return;
    }

    pintrk('track', title, data);

    if (debug) {
      log(`called fbq('track', '${title}');`);
      if (data) {
        log('with data', data);
      }
    }
  },

  pintrk(...args) {
    if (!verifyInit()) {
      return;
    }

    pintrk(...args);

    if (debug) {
      log(`called pintrk('${args.slice(0, 2).join("', '")}')`);

      if (args[2]) {
        log('with data', args[2]);
      }
    }
  },
};
