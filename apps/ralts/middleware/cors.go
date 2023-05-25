package middleware

import (
	"os"

	"github.com/gin-gonic/gin"
)

func Cors() gin.HandlerFunc {
	SMEARGLE_ORIGIN := os.Getenv("SMEARGLE_DOMAIN") + ":" + os.Getenv("SMEARGLE_PORT")
	return func(ctx *gin.Context) {

		ctx.Header("Access-Control-Allow-Origin", SMEARGLE_ORIGIN)
		ctx.Header("Access-Control-Allow-Credentials", "true")
		ctx.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		ctx.Header("Access-Control-Allow-Methods", "POST,HEAD,PATCH, OPTIONS, GET, PUT")

		if ctx.Request.Method == "OPTIONS" {
			ctx.AbortWithStatus(204)
			return
		}
		ctx.Next()
	}
}
