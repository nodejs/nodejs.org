export function createInterface({ input }: { input: Promise<Response> }) {
  const resp = input.then(resp => resp.body!.getReader());
  let closed = false;
  let closeCallback: (...args: Array<unknown>) => void;

  return {
    on: (
      event: 'line' | 'close' | string,
      callback: (...args: Array<unknown>) => void
    ) => {
      if (event !== 'line' && event !== 'close') {
        throw new Error(
          `readline interface \`on\`, wrong event provided: ${event}`
        );
      }

      if (event === 'line') {
        const textDecoder = new TextDecoder();
        let text = '';
        const lineCallback = (...args: Array<unknown>) => {
          if (!closed) {
            callback?.(...args);
          }
        };

        const emitLines = (done = false) => {
          const newLineIdx = text.indexOf('\n');
          if (newLineIdx === -1) {
            if (done) {
              lineCallback(text);
            }
            return;
          }
          const toEmit = text.slice(0, newLineIdx);
          lineCallback(toEmit);
          text = text.slice(newLineIdx + 1);
          emitLines();
        };

        const read = () => {
          resp.then(s => {
            s.read().then(({ done, value }) => {
              text += textDecoder.decode(value);
              emitLines();

              if (!done) {
                read();
              } else {
                closeCallback?.();
              }
            });
          });
        };

        return read();
      }

      if (event === 'close') {
        closeCallback = callback;
        return;
      }
    },
    close: () => {
      closed = true;
      closeCallback?.();
    },
  };
}

export default {
  createInterface,
};
