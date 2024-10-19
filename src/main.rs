use api::web::server;
use infra::{config::Config, logger};

mod api;
mod infra;

#[tokio::main]
async fn main() {
  let config = Config::new().expect("Failed to load configuration");
  logger::add_logger(&config);
  server::start(&config).await;
}
