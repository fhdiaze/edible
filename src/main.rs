use askama::Template;
use axum::{response::Html, routing::get, Router};
use infra::{config::Config, logger};
use std::net::SocketAddr;
use tokio::net::TcpListener;
use tower_http::services::ServeDir;
use tracing::info;

mod infra;

#[tokio::main]
async fn main() {
  let config = Config::new().expect("Failed to load configuration");
  logger::add_logger(&config);

  info!("Starting the web server!");

  let router = Router::new()
    .nest("/", route_home())
    .nest("/", route_school())
    .nest("/", route_blog())
    .nest("/", route_about())
    .nest("/", route_contact())
    .nest("/assets", route_assets())
    .layer(logger::trace_layer());

  let address = SocketAddr::from(([0, 0, 0, 0], config.server.port));
  let listener = TcpListener::bind(address)
    .await
    .expect("Failed to bind the address!");

  info!("Web server is going to listen on address={}", address);

  axum::serve(listener, router)
    .await
    .expect("Failed to start the web server");
}

fn route_about() -> Router {
  Router::new().route("/about", get(handle_about))
}

#[derive(Template)]
#[template(path = "home.html")]
struct HomeTemplate;

async fn handle_get() -> Html<String> {
  let template = HomeTemplate {};
  let content = template.render().expect("msg");

  Html(content)
}

#[derive(Template)]
#[template(path = "school.html")]
struct SchoolTemplate;

async fn handle_school() -> Html<String> {
  let template = SchoolTemplate {};
  let content = template.render().expect("error!!");

  Html(content)
}

#[derive(Template)]
#[template(path = "about.html")]
struct AboutTemplate;

async fn handle_about() -> Html<String> {
  let template = AboutTemplate {};
  let content = template.render().expect("error!!");

  Html(content)
}

fn route_home() -> Router {
  Router::new().route("/", get(handle_get))
}

fn route_school() -> Router {
  Router::new().route("/school", get(handle_school))
}

fn route_assets() -> Router {
  Router::new().nest_service("/", ServeDir::new("assets"))
}

#[derive(Template)]
#[template(path = "blog.html")]
struct BlogTemplate;

async fn handle_blog() -> Html<String> {
  let template = BlogTemplate {};
  let content = template.render().expect("error!!");

  Html(content)
}

fn route_blog() -> Router {
  Router::new().route("/blog", get(handle_blog))
}

fn route_contact() -> Router {
  Router::new().route("/contact", get(handle_contact))
}

#[derive(Template)]
#[template(path = "contact.html")]
struct ContactTemplate;

async fn handle_contact() -> Html<String> {
  let template = ContactTemplate {};
  let content = template.render().expect("error!!");

  Html(content)
}
