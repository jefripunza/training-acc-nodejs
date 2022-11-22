exports.log = async (_, res) => {
  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SERVER LOG</title>
  </head>
  <body style="background-color: black; color: white">
    <pre id="log" style="display: inline; margin: 0"></pre>
    <script src="/socket.io/socket.io.js"></script>
    <script>
      const socket = io();
      console.log({ socket });
      socket.on("SERVER:LOG", (log) => {
        console.log({ log });
        const last_log = document.getElementById("log").innerHTML;
        document.getElementById("log").innerHTML = last_log + log;
        //
        setTimeout(() => {
          window.scrollTo(0, document.body.scrollHeight);
        }, 200);
      });
    </script>
  </body>
</html>`;
  return res.send(html);
};
