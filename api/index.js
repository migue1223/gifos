"use strict";

class apiGipgy {
  constructor() {
    // endpoints apiGipgy
    this.API_KEY = "u1D9iripUKO0Kpv6uxr8vxuPwAs0z2J4";
    this.API_URL_SEARCH = "https://api.giphy.com/v1/gifs/search?";
    this.API_URL_TRENDING = "https://api.giphy.com/v1/gifs/trending?";
    this.API_URL_TAGS = "https://api.giphy.com/v1/gifs/search/tags?";
    this.API_URL_SEARCH_ID = "https://api.giphy.com/v1/gifs/";
    this.localStorage = JSON.parse(localStorage.getItem("list")) || [];
  }
  // obtener los resultados al elegir la busqueda
  async getResultsCategory(keywords) {
    try {
      return await fetch(
        `${this.API_URL_SEARCH}q=${keywords.toLowerCase()}&api_key=${this.API_KEY}&limit=12&lang=es`
      );
    } catch (error) {
      console.error(error);
    }
  }

  // mostrar sugerencias en buscador
  async getSuggestionsListCategory(keywords) {
    try {
      return await fetch(
        `${this.API_URL_TAGS}q=${keywords.toLowerCase()}&api_key=${this.API_KEY}&limit=5&lang=es`
      );
    } catch (error) {
      console.error(error);
    }
  }

  // obtener ultimos gifs en inicio
  async getTrendingGifs(limit) {
    try {
      return await fetch(
        `${this.API_URL_TRENDING}api_key=${this.API_KEY}&limit=${limit}&lang=es`
      );
    } catch (error) {
      console.error(error);
    }
  }

  // button ver mas gifos
  async getSeeMoreGifos(keywords, offset) {
    try {
      return await fetch(
        `${this.API_URL_SEARCH}q=${keywords.toLowerCase()}&api_key=${this.API_KEY}&limit=12&offset=${offset}&lang=es`
      );
    } catch (error) {
      console.error(error);
    }
  }

  // buscar gifo id
  async getGifoId(idGifo) {
    try {
      return await fetch(`${this.API_URL_SEARCH_ID}${idGifo}?api_key=${this.API_KEY}`);
    } catch (error) {
      console.error(error);
    }
  }
}

export default new apiGipgy();
