/**
 * React Facebook Pixel Module
 *
 * @package react-facebook-pixel
 * @author  Zain Sajjad <zsajjad93@gmail.com>
 */

//
let initialized = false;
let debug = false;

/**
 * Utilities
 */

/**
 * Warn
 * @param  {...any} args
 */
const warn = (...args) => {
  if (!debug) {
    return;
  }
  // eslint-disable-next-line no-console
  console.info(...['[react-facebook-pixel]'].concat(args));
};

/**
 * Log
 * @param  {...any} args
 */
const log = (...args) => {
  if (!debug) {
    return;
  }
  // eslint-disable-next-line no-console
  console.info(...['[react-facebook-pixel]'].concat(args));
};

const verifyInit = () => {
  if (!initialized) {
    warn(
      'Pixel not initialized before using call ReactPixel.init with required params',
    );
  }
  return initialized;
};

//
const defaultOptions = {
  autoConfig: true,
  debug: false,
};

//
export default {
  init(pixelId, advancedMatching = {}, options = defaultOptions) {
    if (typeof window === 'undefined') {
      initialized = false;
      return;
    }

    initialized = window && !!window.fbq;
    // eslint-disable
    // @ts-ignore
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(
      window,
      document,
      'script',
      'https://connect.facebook.net/en_US/fbevents.js',
    );
    fbq('init', pixelId, advancedMatching); // Insert your Pixel ID here
    fbq('track', 'PageView');

    initialized = true;
    debug = options.debug;
  },

  pageView() {
    if (!verifyInit()) {
      return;
    }

    fbq('track', 'PageView');

    if (debug) {
      log("called fbq('track', 'PageView');");
    }
  },

  track(title, data) {
    if (!verifyInit()) {
      return;
    }

    fbq('track', title, data);

    if (debug) {
      log(`called fbq('track', '${title}');`);

      if (data) {
        log('with data', data);
      }
    }
  },

  trackSingle(pixel, title, data) {
    if (!verifyInit()) {
      return;
    }

    fbq('trackSingle', pixel, title, data);

    if (debug) {
      log(`called fbq('trackSingle', '${pixel}', '${title}');`);

      if (data) {
        log('with data', data);
      }
    }
  },

  trackCustom(event, data) {
    if (!verifyInit()) {
      return;
    }

    fbq('trackCustom', event, data);

    if (debug) {
      log(`called fbq('trackCustom', '${event}');`);

      if (data) {
        log('with data', data);
      }
    }
  },

  trackSingleCustom(pixel, event, data) {
    if (!verifyInit()) {
      return;
    }

    fbq('trackSingle', pixel, event, data);

    if (debug) {
      log(`called fbq('trackSingleCustom', '${pixel}', '${event}');`);

      if (data) {
        log('with data', data);
      }
    }
  },

  grantConsent() {
    if (!verifyInit()) {
      return;
    }

    fbq('consent', 'grant');

    if (debug) {
      log(`called fbq('consent', 'grant');`);
    }
  },

  revokeConsent() {
    if (!verifyInit()) {
      return;
    }

    fbq('consent', 'revoke');

    if (debug) {
      log(`called fbq('consent', 'revoke');`);
    }
  },

  fbq(...args) {
    if (!verifyInit()) {
      return;
    }

    fbq(...args);

    if (debug) {
      log(`called fbq('${args.slice(0, 2).join("', '")}')`);

      if (args[2]) {
        log('with data', args[2]);
      }
    }
  },
};
