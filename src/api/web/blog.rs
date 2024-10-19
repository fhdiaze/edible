use askama::Template;
use axum::{response::Html, routing::get, Router};

use crate::infra::result::{AppError, AppResult};

#[derive(Template)]
#[template(path = "school.html")]
struct BlogTemplate;

async fn handle_get() -> AppResult<Html<String>> {
  let template = BlogTemplate {};
  let content = template.render().map_err(AppError::Render)?;

  Ok(Html(content))
}

pub fn route() -> Router {
  Router::new().route("/blog", get(handle_get))
}
