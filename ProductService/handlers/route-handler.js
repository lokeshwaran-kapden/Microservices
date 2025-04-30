const helper = require('./../handlers/query-handler');
const CONSTANTS = require('./../config/constants');

class RouteHandler {
  async getProductDetailHandler(request, response) {
    const productId = request.params.productId;
    if (!productId) {
      return response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.PRODUCTID_NOT_FOUND,
      });
    }

    try {
      const productDetails = await helper.getProductDetails(productId.trim());
      if (!productDetails) {
        return response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.PRODUCT_DETAIL_FAILED,
        });
      }
      return response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
        error: false,
        details: productDetails,
      });
    } catch (error) {
      return response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.SERVER_ERROR_MESSAGE,
      });
    }
  }

  async getProductsRouteHandler(request, response) {
    try {
      const products = await helper.getAllProducts();
      return response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
        error: false,
        details: products,
      });
    } catch (error) {
      return response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.SERVER_ERROR_MESSAGE,
      });
    }
  }

  routeNotFoundHandler(request, response) {
    response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
      error: true,
      message: CONSTANTS.ROUTE_NOT_FOUND,
    });
  }
}

module.exports = new RouteHandler();
  