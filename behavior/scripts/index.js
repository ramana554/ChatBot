'use strict'

exports.handle = function handle(client) {
  const sayHello = client.createStep({
    satisfied() {
      return Boolean(client.getConversationState().helloSent)
    },

    prompt() {
      client.addResponse('welcome')
      client.addResponse('provide/documentation', {
        documentation_link: 'http://docs.init.ai',
      })
      client.addResponse('provide/instructions')
      client.updateConversationState({
        helloSent: true
      })
      client.done()
    }
  })

  const untrained = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('apology/untrained')
      client.done()
    }
  })

  const handleGreeting = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('greeting')
      client.done()
    }
  })
  const handleGoodbye = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('greeting')
      client.done()
    }
  })
  
  const handleBye = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('bye')
      client.done()
    }
  })
  
    const handleQuery = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('Reply')
      client.done()
    }
  })
  
    const handleReply = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('Reply')
      client.done()
    }
  })
  
    const handleAboutAscendia = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('aboutAscendia_bot')
      client.done()
    }
  })
  
    const handleAboutAscendia_bot = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('aboutAscendia_bot')
      client.done()
    }
  })

  client.runFlow({
    classifications: {
      bye: 'bye',
	  goodbye: 'goodbye',
      greeting: 'greeting',
	  query: 'query',
	  reply: 'reply',
	  aboutAscendia: 'aboutAscendia',
	  aboutAscendia_bot: 'aboutAscendia_bot'
    },
    streams: {
	  goodbye: handleGoodbye,
      bye: handleBye,
      greeting: handleGreeting,
	  query: handleQuery,
	  reply: handleReply,
	  aboutAscendia: handleAboutAscendia,
	  aboutAscendia_bot: handleAboutAscendia_bot,	  
      main: 'onboarding',
      onboarding: [sayHello],
      end: [untrained]
    }
  })
}
