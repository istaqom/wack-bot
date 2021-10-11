module.exports = {
  name: "ping",
  description: "Ping the bot",
  execute(message) {
    return message.channel.send("Pinging...").then((sent) => {
      sent.edit(
        `Roundtrip latency: ${
          sent.createdTimestamp - message.createdTimestamp
        }ms`
      );
    });
  },
};
