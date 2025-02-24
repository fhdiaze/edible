use config as conf;
use serde::Deserialize;

#[derive(Debug, Deserialize, Clone)]
pub struct Server {
  pub port: u16,
}

#[derive(Debug, Deserialize, Clone)]
pub struct Log {
  pub level: String,
}

#[derive(Debug, Deserialize)]
pub struct Config {
  pub server: Server,
  pub log: Log,
}

impl Config {
  pub fn new() -> Result<Self, conf::ConfigError> {
    let builder = conf::Config::builder()
      .add_source(conf::File::with_name("./config/default.toml"))
      .add_source(
        conf::Environment::with_prefix("EDIBLE")
          .prefix_separator("_")
          .separator("__")
          .ignore_empty(true),
      );

    let config: Config = builder.build()?.try_deserialize()?;

    Ok(config)
  }
}
