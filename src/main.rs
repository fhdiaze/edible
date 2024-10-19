use api::web::{home, server};
use askama::Template;
use axum::{response::Html, routing::get, Router};
use infra::{config::Config, logger};
use std::net::SocketAddr;
use tokio::net::TcpListener;
use tower_http::services::ServeDir;
use tracing::info;

mod api;
mod infra;

#[tokio::main]
async fn main() {
  let config = Config::new().expect("Failed to load configuration");
  logger::add_logger(&config);
  server::start(&config).await;
}
