;(this['webpackJsonpmsal-react-app'] =
  this['webpackJsonpmsal-react-app'] || []).push([
  [0],
  {
    401: function (e, t) {},
    403: function (e, t) {},
    413: function (e, t, n) {},
    414: function (e, t, n) {
      'use strict'
      n.r(t)
      var a = n(1),
        s = n(0),
        r = n.n(s),
        o = n(25),
        c = n.n(o),
        i = n(24),
        l = n(21),
        d = n.n(l),
        u = n(34),
        j = n(38),
        b = n(19),
        p = n(8),
        h = n(40),
        O = n(86),
        g = n(26),
        x = {
          auth: {
            clientId: '3ee9d15a-60e1-4aea-b21d-bd09d831e62c',
            tenantId: 'a7dbec41-2d60-49c3-a1c8-790d52eaec3c',
            applicationResourceId: 'a53c68a6-b4f3-41e0-ba01-cf96fe5d7c29',
            scopes: {
              graph: ['user.read', 'offline_access'],
              customApi: [
                'api://54ee17f8-21c1-4891-931d-25e1ed8cfe06/Site.Access'
              ]
            }
          },
          endpoints: {
            graph: 'https://graph.microsoft.com/v1.0',
            login: 'https://login.microsoftonline.com',
            customApi: 'https://fyp-assistance.herokuapp.com'
          },
          appRoles: {
            '170a8e98-463f-4f72-b783-963f05923afc': {
              displayName: 'Student',
              priority: 1
            },
            'de311fc8-6e4b-4ee3-8e55-c5e82319a94f': {
              displayName: 'Supervisor',
              priority: 2
            },
            'fb3c340f-81e7-4c73-bca8-637e0efc1fc2': {
              displayName: 'Coordinator',
              priority: 3
            },
            '141cfda0-c415-4aba-a6af-20bfc1a639f7': {
              displayName: 'Administrator',
              priority: 4
            }
          }
        },
        f = {
          auth: {
            clientId: x.auth.clientId,
            redirectUri: 'https://fyp-assistance-spa.herokuapp.com/',
            postLogoutRedirectUri: 'https://fyp-assistance-spa.herokuapp.com'
          }
        },
        v = {
          authority: ''.concat(x.endpoints.login, '/').concat(x.auth.tenantId),
          scopes: ['user.read', 'offline_access'],
          redirectUri: Object({
            NODE_ENV: 'production',
            PUBLIC_URL: '',
            WDS_SOCKET_HOST: void 0,
            WDS_SOCKET_PATH: void 0,
            WDS_SOCKET_PORT: void 0,
            FAST_REFRESH: !0,
            REACT_APP_ALLOW_USER_PHASE_CHANGE: '0',
            REACT_APP_API_URL: 'https://fyp-assistance.herokuapp.com',
            REACT_APP_AZURE_APPLICATION_RESOURCE_ID:
              'a53c68a6-b4f3-41e0-ba01-cf96fe5d7c29',
            REACT_APP_AZURE_CLIENT_ID: '3ee9d15a-60e1-4aea-b21d-bd09d831e62c',
            REACT_APP_AZURE_CUSTOM_API_SCOPE:
              'api://54ee17f8-21c1-4891-931d-25e1ed8cfe06/Site.Access',
            REACT_APP_AZURE_TENANT_ID: 'a7dbec41-2d60-49c3-a1c8-790d52eaec3c',
            REACT_APP_ENV: 'production',
            REACT_APP_MS_GRAPH_ENDPOINT: 'https://graph.microsoft.com/v1.0',
            REACT_APP_MS_LOGIN_ENDPOINT: 'https://login.microsoftonline.com',
            REACT_APP_POST_LOGOUT_URL:
              'https://fyp-assistance-spa.herokuapp.com',
            REACT_APP_REDIRECT_URL: 'https://fyp-assistance-spa.herokuapp.com/',
            REACT_APP_ROOT_URL: 'https://fyp-assistance-spa.herokuapp.com'
          }).REACT_APP_REDIRECT
        },
        m = Object(s.createContext)(),
        y = function (e) {
          var t = Object(s.useState)(null),
            n = Object(p.a)(t, 2),
            r = n[0],
            o = n[1]
          return Object(a.jsx)(m.Provider, {
            value: {
              user: r,
              setUserObject: function (e) {
                o(e)
              }
            },
            children: e.children
          })
        },
        S = n(31),
        C = n(32),
        P = (function () {
          function e(t) {
            Object(S.a)(this, e), Object.assign(this, t)
          }
          return (
            Object(C.a)(e, null, [
              {
                key: 'modelName',
                get: function () {
                  return 'Phase'
                }
              }
            ]),
            e
          )
        })(),
        T = Object(s.createContext)(),
        w = function (e) {
          var t = Object(s.useState)(null),
            n = Object(p.a)(t, 2),
            r = n[0],
            o = n[1]
          return Object(a.jsx)(T.Provider, {
            value: {
              currentPhase: new P(Object(b.a)({}, r)),
              setCurrentPhase: function (e) {
                o(e)
              }
            },
            children: e.children
          })
        },
        k = n(229),
        A = Object(s.createContext)(),
        N = Object(k.a)(A.Consumer),
        E = n(186)
      function R(e) {
        console.log('Building abilities for', e)
        var t = new E.b(E.a),
          n = t.can,
          a = t.cannot,
          s = t.build
        switch (
          (n('takeActionPhaseOne', 'Phase', { phase: 1 }),
          n('takeActionPhaseTwo', 'Phase', { phase: 2 }),
          n('takeActionPhaseThree', 'Phase', { phase: 3 }),
          n('takeActionPhaseFour', 'Phase', { phase: 4 }),
          e.role)
        ) {
          case 'Student':
            n('read', 'Topic'),
              n('create', 'Proposal'),
              n('read', 'Proposal', { student: e.id }),
              n('manage', 'Proposal', { student: e.id })
            break
          case 'Supervisor':
            n('read', 'Topic'),
              n('create', 'Topic'),
              n('manage', 'Topic', { supervisor: e.id }),
              n('read', 'Proposal'),
              n('respond', 'Proposal', { 'topic.supervisor': e.id })
            break
          case 'Coordinator':
            n('manage', 'Student'),
              n('manage', 'Supervisor'),
              n('read', 'Topic'),
              n('create', 'Topic'),
              n('manage', 'Topic', { supervisor: e.id }),
              n('read', 'Proposal'),
              n('respond', 'Proposal', { 'topic.supervisor': e.id })
            break
          case 'Administrator':
            n('manage', 'Coordinator'), n('update', 'Phase')
            break
          default:
            a('*', '*')
        }
        return s()
      }
      var M = n(87),
        D = n.n(M),
        I = (function () {
          var e = Object(j.a)(
            d.a.mark(function e(t, n) {
              var a
              return d.a.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (e.next = 2),
                        t.acquireTokenSilent(n).catch(
                          (function () {
                            var e = Object(j.a)(
                              d.a.mark(function e(a) {
                                var s
                                return d.a.wrap(function (e) {
                                  for (;;)
                                    switch ((e.prev = e.next)) {
                                      case 0:
                                        if (
                                          (console.log(
                                            'Interaction Required for access token'
                                          ),
                                          'InteractionRequiredAuthError' !==
                                            a.name)
                                        ) {
                                          e.next = 6
                                          break
                                        }
                                        return (
                                          (e.next = 4),
                                          t
                                            .acquireTokenPopup(n)
                                            .catch(function (e) {
                                              console.error(e)
                                            })
                                        )
                                      case 4:
                                        return (
                                          (s = e.sent),
                                          e.abrupt('return', s.accessToken)
                                        )
                                      case 6:
                                        console.log(
                                          'Error getting access token: ',
                                          a
                                        )
                                      case 7:
                                      case 'end':
                                        return e.stop()
                                    }
                                }, e)
                              })
                            )
                            return function (t) {
                              return e.apply(this, arguments)
                            }
                          })()
                        )
                      )
                    case 2:
                      if (!(a = e.sent) || !a.accessToken) {
                        e.next = 7
                        break
                      }
                      return e.abrupt('return', a.accessToken)
                    case 7:
                      console.log('Silent Error: ', a)
                    case 8:
                    case 'end':
                      return e.stop()
                  }
              }, e)
            })
          )
          return function (t, n) {
            return e.apply(this, arguments)
          }
        })(),
        L = null,
        W = null,
        F = !1,
        U = D.a.create({ baseURL: x.endpoints.customApi, timeout: 4e3 })
      U.interceptors.request.use(
        (function () {
          var e = Object(j.a)(
            d.a.mark(function e(t) {
              var n, a
              return d.a.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        console.log('Sending request'),
                        console.log(t),
                        (n = {
                          authority: ''
                            .concat(x.endpoints.login, '/')
                            .concat(x.auth.tenantId),
                          scopes: x.auth.scopes.customApi,
                          account: W
                        }),
                        (e.next = 5),
                        I(L, n)
                      )
                    case 5:
                      return (
                        (a = e.sent)
                          ? (t.headers = { Authorization: 'Bearer '.concat(a) })
                          : delete t.headers.Authorization,
                        e.abrupt('return', t)
                      )
                    case 8:
                    case 'end':
                      return e.stop()
                  }
              }, e)
            })
          )
          return function (t) {
            return e.apply(this, arguments)
          }
        })()
      )
      var B = (function () {
          var e = Object(j.a)(
            d.a.mark(function e(t, n) {
              return d.a.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return e.abrupt(
                        'return',
                        new Promise(function (e, a) {
                          if (F) return e('Is setup')
                          ;(L = t),
                            (W = n),
                            U.get('/ping', { timeout: 2e3 })
                              .then(function () {
                                return (F = !0), e('setup complete')
                              })
                              .catch(function (e) {
                                return (
                                  console.log(e),
                                  console.log(
                                    'Timed Out: Server not Available'
                                  ),
                                  a(
                                    new Error('Timed Out: Server not Available')
                                  )
                                )
                              })
                        })
                      )
                    case 1:
                    case 'end':
                      return e.stop()
                  }
              }, e)
            })
          )
          return function (t, n) {
            return e.apply(this, arguments)
          }
        })(),
        q = U,
        z = null,
        V = null,
        H = !1,
        G = D.a.create({ baseURL: x.endpoints.graph, timeout: 4e3 })
      G.interceptors.request.use(
        (function () {
          var e = Object(j.a)(
            d.a.mark(function e(t) {
              var n, a
              return d.a.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        console.log('Sending request to Graph'),
                        (n = {
                          authority: ''
                            .concat(x.endpoints.login, '/')
                            .concat(x.auth.tenantId),
                          scopes: x.auth.scopes.graph,
                          account: V
                        }),
                        (e.next = 4),
                        I(z, n)
                      )
                    case 4:
                      return (
                        (a = e.sent)
                          ? (t.headers = { Authorization: 'Bearer '.concat(a) })
                          : delete t.headers.Authorization,
                        e.abrupt('return', t)
                      )
                    case 7:
                    case 'end':
                      return e.stop()
                  }
              }, e)
            })
          )
          return function (t) {
            return e.apply(this, arguments)
          }
        })()
      )
      var Y = G,
        J = (function () {
          function e(t) {
            Object(S.a)(this, e), Object.assign(this, t)
          }
          return (
            Object(C.a)(e, null, [
              {
                key: 'modelName',
                get: function () {
                  return 'Proposal'
                }
              }
            ]),
            e
          )
        })(),
        K = n(481),
        Z = Object(s.createContext)(),
        Q = function (e) {
          var t = e.children,
            n = Object(s.useState)({
              step: 0,
              isCustomProposal: !1,
              topic: null
            }),
            r = Object(p.a)(n, 2),
            o = r[0],
            c = r[1]
          return Object(a.jsx)(Z.Provider, {
            value: {
              contextData: o,
              setContextData: function (e) {
                c(function (t) {
                  return Object(b.a)(Object(b.a)({}, t), e)
                })
              }
            },
            children: t
          })
        },
        X = function () {
          return Object(s.useContext)(Z)
        },
        $ = n(88)
      function ee(e) {
        var t = e.error
        return (
          console.log(t),
          Object(a.jsxs)($.a, {
            variant: 'h6',
            children: ['An Error Occurred: ', t.errorCode]
          })
        )
      }
      function te() {
        return Object(a.jsx)($.a, {
          variant: 'h6',
          children: 'Authentication in progress...'
        })
      }
      function ne() {
        return Object(a.jsx)($.a, {
          variant: 'h6',
          children: 'Getting things ready...'
        })
      }
      var ae = n(502),
        se = n(461),
        re = n(464),
        oe = n(465),
        ce = n(466),
        ie = n(499),
        le = n(467),
        de = n(454),
        ue = n(468),
        je = n(417),
        be = n(469),
        pe = n(470),
        he = n(471),
        Oe = n(472),
        ge = n(473),
        xe = n(474),
        fe = n(475),
        ve = n(476),
        me = {
          draft: 'Draft',
          suggestion: 'Ready for Submission',
          active: 'Active',
          archived: 'Archived',
          assigned: 'Assigned',
          prev_term: 'From Previous Term'
        },
        ye = function (e) {
          return me[e]
        },
        Se = n(159),
        Ce = n(455),
        Pe = n(453),
        Te = Object(Pe.a)(function (e) {
          return { root: { margin: e.spacing(3, 0, 2) } }
        }),
        we = function (e) {
          var t = e.children,
            n = e.loading,
            s = Object(Se.a)(e, ['children', 'loading']),
            r = Te()
          return Object(a.jsxs)(
            de.a,
            Object(b.a)(
              Object(b.a)(
                {
                  type: 'submit',
                  fullWidth: !0,
                  variant: 'contained',
                  color: 'primary',
                  className: r.root,
                  disabled: n
                },
                s
              ),
              {},
              { children: [n && Object(a.jsx)(Ce.a, { size: 14 }), !n && t] }
            )
          )
        }
      we.defaultProps = { loading: !1 }
      var ke = we,
        Ae = n(29),
        Ne = n(419),
        _e = n(463),
        Ee = n(460),
        Re = n(462),
        Me = n(161),
        De = n(47),
        Ie = n(16),
        Le = {
          title: '',
          description: '',
          additionalNotes: '',
          tags: [],
          targetCourses: []
        },
        We = {
          title: Ie.c().required('Topic must have a title'),
          description: Ie.c().required('Toic must have a description'),
          tags: Ie.a(Ie.c()).min(
            1,
            'You must specify at least one tag for your Topic'
          ),
          additionalNotes: Ie.c(),
          targetCourses: Ie.a(Ie.c())
        },
        Fe = Ie.b().shape(Object(b.a)({}, We)),
        Ue = Ie.b().shape(
          Object(b.a)(
            Object(b.a)({}, We),
            {},
            {
              status: Ie.c().oneOf([
                'draft',
                'suggestion',
                'active',
                'archived',
                'assigned',
                'prev_term'
              ])
            }
          )
        ),
        Be = n(458),
        qe = n(495),
        ze = n(504),
        Ve = n(501),
        He = Object(s.forwardRef)(function (e, t) {
          return Object(a.jsx)(
            Ve.a,
            Object(b.a)(
              {
                variant: e.readOnly ? 'standard' : 'outlined',
                margin: 'normal',
                inputRef: t,
                fullWidth: !0,
                multiline: !0,
                rows: 3,
                rowsMax: 6,
                inputProps: { readOnly: e.readOnly }
              },
              e
            )
          )
        })
      He.defaultProps = { readOnly: !1 }
      var Ge = He,
        Ye = Object(s.forwardRef)(function (e, t) {
          return Object(a.jsx)(
            Ve.a,
            Object(b.a)(
              {
                variant: e.readOnly ? 'standard' : 'outlined',
                margin: 'normal',
                inputRef: t,
                fullWidth: !0,
                inputProps: { readOnly: e.readOnly }
              },
              e
            )
          )
        })
      Ye.defaultProps = { readOnly: !1 }
      var Je = Ye,
        Ke = n(492),
        Ze = (n(395), n(459)),
        Qe = Ke.a.SHOW_PARENT,
        Xe = function (e) {
          var t = Object(s.useState)(null),
            n = Object(p.a)(t, 2),
            r = n[0],
            o = n[1],
            c = Object(s.useState)(!0),
            i = Object(p.a)(c, 2),
            l = i[0],
            d = i[1]
          Object(s.useEffect)(function () {
            q.get('/tag')
              .then(function (e) {
                o(e.data)
              })
              .catch(function (e) {
                console.log(e)
              })
              .finally(function () {
                d(!1)
              })
          }, [])
          var u = {
            value: e.value,
            onChange: e.onChange,
            treeCheckable: !0,
            showCheckedStrategy: Qe,
            placeholder: 'Search Topic Tags',
            bordered: !0,
            showSearch: !0,
            size: 'large'
          }
          if (l)
            return Object(a.jsx)($.a, {
              varaint: 'body1',
              style: { marginLeft: '5px' },
              children: 'Loading Tags List...'
            })
          var j = { margin: '10px 0' }
          return (
            e.error && ((j.border = 'solid 1px red'), (j.borderRadius = '5px')),
            Object(a.jsxs)('div', {
              style: j,
              children: [
                Object(a.jsx)(
                  Ke.a,
                  Object(b.a)(
                    Object(b.a)({}, u),
                    {},
                    {
                      treeData: r,
                      style: {
                        width: '100%',
                        pointerEvents: e.disabled ? 'none' : 'auto'
                      }
                    }
                  )
                ),
                e.error &&
                  Object(a.jsx)(Ze.a, {
                    error: e.error,
                    children: e.helperText
                  })
              ]
            })
          )
        },
        $e = n(494),
        et = [
          'LM051 - Computer Systems',
          'LM052 - Course 2',
          'Lm053 - Course 3'
        ],
        tt = function (e) {
          var t = e.control,
            n = e.error,
            s = e.helperText,
            r = e.disabled,
            o = e.label
          return Object(a.jsx)(Ae.a, {
            render: function (e) {
              var t = e.onChange,
                c = e.value
              return Object(a.jsx)($e.a, {
                multiple: !0,
                value: c,
                options: et,
                getOptionLabel: function (e) {
                  return e
                },
                defaultValue: c,
                disabled: r,
                filterSelectedOptions: !0,
                renderInput: function (e) {
                  return Object(a.jsx)(
                    Je,
                    Object(b.a)(
                      Object(b.a)({}, e),
                      {},
                      {
                        variant: 'outlined',
                        label: o || 'Choose a Course',
                        placeholder: 'Course',
                        error: n,
                        helperText: s
                      }
                    )
                  )
                },
                onChange: function (e, n) {
                  return t(n)
                }
              })
            },
            name: 'targetCourses',
            control: t
          })
        },
        nt = Object(Pe.a)(function (e) {
          return { formControl: { minWidth: 300, flex: 1 } }
        }),
        at = function (e) {
          var t,
            n,
            s,
            r,
            o,
            c,
            i,
            l,
            d,
            u,
            j = nt()
          return Object(a.jsxs)(a.Fragment, {
            children: [
              Object(a.jsx)(Je, {
                ref: e.register,
                name: 'title',
                label: 'Title',
                readOnly: !e.editMode,
                error: !!e.errors.title,
                helperText:
                  null === (t = e.errors) ||
                  void 0 === t ||
                  null === (n = t.title) ||
                  void 0 === n
                    ? void 0
                    : n.message
              }),
              Object(a.jsx)(Ge, {
                inputRef: e.register,
                name: 'description',
                label: 'Description',
                readOnly: !e.editMode,
                error: !!e.errors.description,
                helperText:
                  null === (s = e.errors) ||
                  void 0 === s ||
                  null === (r = s.description) ||
                  void 0 === r
                    ? void 0
                    : r.message
              }),
              Object(a.jsx)(Ae.a, {
                control: e.control,
                name: 'tags',
                render: function (t) {
                  var n,
                    s,
                    r,
                    o = t.onChange,
                    c = t.value
                  return Object(a.jsx)(Xe, {
                    value: c,
                    onChange: function (e) {
                      o(e)
                    },
                    error: !!(null === (n = e.errors) || void 0 === n
                      ? void 0
                      : n.tags),
                    helperText:
                      null === (s = e.errors) ||
                      void 0 === s ||
                      null === (r = s.tags) ||
                      void 0 === r
                        ? void 0
                        : r.message,
                    disabled: !e.editMode
                  })
                }
              }),
              Object(a.jsx)(Ge, {
                inputRef: e.register,
                label: 'Additional Notes',
                name: 'additionalNotes',
                readOnly: !e.editMode,
                error: !!e.errors.additionalNotes,
                helperText:
                  null === (o = e.errors) ||
                  void 0 === o ||
                  null === (c = o.additionalNotes) ||
                  void 0 === c
                    ? void 0
                    : c.message
              }),
              Object(a.jsx)(tt, {
                control: e.control,
                error: !!e.errors.targetCourses,
                helperText:
                  null === (i = e.errors) ||
                  void 0 === i ||
                  null === (l = i.targetCourses) ||
                  void 0 === l
                    ? void 0
                    : l.message,
                disabled: !e.editMode
              }),
              Object(a.jsxs)(Be.a, {
                variant: 'outlined',
                className: j.formControl,
                fullWidth: !0,
                children: [
                  Object(a.jsx)('label', { children: 'Status' }),
                  Object(a.jsx)(Ae.a, {
                    render: function (t) {
                      var n = t.onChange,
                        s = t.value
                      return Object(a.jsxs)(qe.a, {
                        disabled: !e.editMode,
                        value: s,
                        onChange: n,
                        children: [
                          Object(a.jsx)(ze.a, {
                            value: 'draft',
                            children: 'Draft'
                          }),
                          Object(a.jsx)(ze.a, {
                            value: 'archived',
                            style: { color: 'red' },
                            children: 'Archived'
                          }),
                          Object(a.jsx)(ze.a, {
                            value: 'active',
                            disabled: !0,
                            children: 'Active'
                          }),
                          Object(a.jsx)(ze.a, {
                            value: 'assigned',
                            disabled: !0,
                            children: 'Assigned'
                          }),
                          Object(a.jsx)(ze.a, {
                            value: 'prev_term',
                            disabled: !0,
                            children: 'From Previous Term'
                          })
                        ]
                      })
                    },
                    name: 'status',
                    control: e.control,
                    error: !!e.errors.status,
                    helperText:
                      null === (d = e.errors) ||
                      void 0 === d ||
                      null === (u = d.status) ||
                      void 0 === u
                        ? void 0
                        : u.message
                  })
                ]
              })
            ]
          })
        },
        st = function (e) {
          var t, n, s, r, o, c, i, l
          return Object(a.jsxs)(a.Fragment, {
            children: [
              Object(a.jsx)(Je, {
                inputRef: e.register,
                label: 'Title',
                name: 'title',
                readOnly: !e.editMode,
                error: !!e.errors.title,
                helperText:
                  null === (t = e.errors) ||
                  void 0 === t ||
                  null === (n = t.title) ||
                  void 0 === n
                    ? void 0
                    : n.message
              }),
              Object(a.jsx)(Ge, {
                inputRef: e.register,
                name: 'description',
                label: 'Description',
                readOnly: !e.editMode,
                error: !!e.errors.description,
                helperText:
                  null === (s = e.errors) ||
                  void 0 === s ||
                  null === (r = s.description) ||
                  void 0 === r
                    ? void 0
                    : r.message
              }),
              Object(a.jsx)(Ae.a, {
                control: e.control,
                name: 'tags',
                render: function (t) {
                  var n,
                    s,
                    r,
                    o = t.onChange,
                    c = t.value
                  return Object(a.jsx)(Xe, {
                    value: c,
                    onChange: function (e) {
                      o(e)
                    },
                    error: !!(null === (n = e.errors) || void 0 === n
                      ? void 0
                      : n.tags),
                    helperText:
                      null === (s = e.errors) ||
                      void 0 === s ||
                      null === (r = s.tags) ||
                      void 0 === r
                        ? void 0
                        : r.message,
                    disabled: !e.editMode
                  })
                }
              }),
              Object(a.jsx)(Ge, {
                inputRef: e.register,
                label: 'Additional Notes',
                name: 'additionalNotes',
                readOnly: !e.editMode,
                error: !!e.errors.additionalNotes,
                helperText:
                  null === (o = e.errors) ||
                  void 0 === o ||
                  null === (c = o.additionalNotes) ||
                  void 0 === c
                    ? void 0
                    : c.message
              }),
              Object(a.jsx)(tt, {
                control: e.control,
                error: !!e.errors.targetCourses,
                helperText:
                  null === (i = e.errors) ||
                  void 0 === i ||
                  null === (l = i.targetCourses) ||
                  void 0 === l
                    ? void 0
                    : l.message,
                readOnly: !e.editMode
              })
            ]
          })
        },
        rt = Object(Pe.a)(function (e) {
          return {
            formControl: { minWidth: 300, flex: 1 },
            selectEmpty: { marginTop: e.spacing(2) },
            readOnlySelect: {
              width: 300,
              '&.Mui-disabled option': { color: 'black' }
            },
            buttonProgress: {
              color: Me.a[500],
              position: 'absolute',
              left: '50%'
            },
            dialogCloseButton: {
              position: 'absolute',
              top: e.spacing(1),
              right: e.spacing(1),
              color: e.palette.grey[500],
              fontSize: '28px'
            },
            dialogEditButton: { marginBottom: e.spacing(1) }
          }
        }),
        ot = function (e) {
          var t,
            n = rt(),
            r = {
              title: (t = e.topic).title,
              description: t.description,
              tags: t.tags,
              additionalNotes: t.additionalNotes || '',
              targetCourses: t.targetCourses || [],
              status: t.status
            },
            o = Object(s.useState)(!1),
            c = Object(p.a)(o, 2),
            i = c[0],
            l = c[1],
            d = Object(s.useState)(!1),
            u = Object(p.a)(d, 2),
            j = u[0],
            b = u[1],
            h = Object(Ae.c)({
              resolver: Object(De.yupResolver)(Ue),
              reValidateMode: 'onChange',
              defaultValues: r
            }),
            O = h.register,
            g = h.handleSubmit,
            x = h.errors,
            f = h.control,
            v = h.reset
          Object(s.useEffect)(
            function () {
              v({
                title: e.topic.title,
                description: e.topic.description,
                tags: e.topic.tags,
                additionalNotes: e.topic.additionalNotes,
                targetCourses: e.topic.targetCourses,
                status: e.topic.status
              })
            },
            [e.topic]
          )
          var m = function () {
            l(!i)
          }
          return Object(a.jsxs)(ae.a, {
            fullWidth: !0,
            maxWidth: 'lg',
            open: e.dialogOpen,
            onClose: function () {
              console.log('impement dialog close')
            },
            'aria-labelledby': 'max-width-dialog-title',
            style: { zIndex: '900 !important' },
            disableBackdropClick: !0,
            children: [
              Object(a.jsx)(Ne.a, {
                className: n.dialogCloseButton,
                onClick: function () {
                  ;(i &&
                    !1 ===
                      confirm(
                        'Unsaved changes will be lost!. Are you sure you want to exit?'
                      )) ||
                    e.setDialogOpen(!1)
                },
                disabled: j,
                children: Object(a.jsx)(Ee.a, {})
              }),
              Object(a.jsxs)(se.a, {
                id: 'max-width-dialog-title',
                children: [
                  Object(a.jsx)(de.a, {
                    variant: 'contained',
                    className: n.dialogEditButton,
                    color: i ? 'secondary' : 'primary',
                    onClick: m,
                    disabled: j,
                    endIcon: Object(a.jsx)(Re.a, {}),
                    children: 'Toggle Edit Mode'
                  }),
                  Object(a.jsx)(_e.a, {})
                ]
              }),
              Object(a.jsx)(re.a, {
                children: Object(a.jsxs)('form', {
                  onSubmit: g(function (t) {
                    var n = (function (t) {
                      var n = _.reduce(
                        t,
                        function (t, n, a) {
                          return _.isEqual(n, e.topic[a]) || (t[a] = n), t
                        },
                        {}
                      )
                      return (
                        console.log(n), Object.keys(n).length > 0 ? n : null
                      )
                    })(t)
                    console.log(n),
                      n
                        ? (b(!0),
                          q
                            .post('/topic/edit/'.concat(e.topic._id), n)
                            .then(function (t) {
                              console.log(t), e.setDialogOpen(!1), e.refresh()
                            })
                            .catch(function (e) {
                              console.log(e)
                            })
                            .finally(function () {
                              b(!1), m()
                            }))
                        : m()
                  }),
                  children: [
                    'regular' === e.topic.type
                      ? Object(a.jsx)(at, {
                          register: O,
                          control: f,
                          errors: x,
                          editMode: i
                        })
                      : Object(a.jsx)(st, {
                          register: O,
                          control: f,
                          errors: x,
                          editMode: i
                        }),
                    i &&
                      Object(a.jsx)(ke, {
                        loading: j,
                        children: 'Save Changes'
                      })
                  ]
                })
              })
            ]
          })
        }
      ot.defaultProps = {
        topic: {},
        dialogOpen: !1,
        setDialogOpen: function () {},
        refresh: function () {}
      }
      var ct = ot
      function it(e) {
        var t = Object(s.useState)([]),
          n = Object(p.a)(t, 2),
          r = n[0],
          o = n[1],
          c = Object(s.useState)(!1),
          l = Object(p.a)(c, 2),
          d = l[0],
          u = l[1],
          j = Object(s.useState)(!0),
          b = Object(p.a)(j, 2),
          O = b[0],
          g = b[1],
          x = Object(s.useState)(!1),
          f = Object(p.a)(x, 2),
          v = f[0],
          m = f[1],
          y = Object(s.useState)(null),
          S = Object(p.a)(y, 2),
          C = S[0],
          P = S[1],
          w = Object(s.useState)(!1),
          k = Object(p.a)(w, 2),
          A = (k[0], k[1], Object(s.useState)(!1)),
          _ = Object(p.a)(A, 2),
          E = (_[0], _[1], Object(s.useState)(!1)),
          R = Object(p.a)(E, 2),
          M = R[0],
          D = R[1],
          I = Object(s.useContext)(T).currentPhase,
          L = Object(h.f)()
        Object(s.useEffect)(function () {
          W()
        }, [])
        var W = function () {
            q.get('/topic/me')
              .then(function (e) {
                console.log(e)
                var t = [],
                  n = !1
                if (
                  (e.data.topics.forEach(function (e) {
                    'regular' === e.type
                      ? t.push(e)
                      : 'studentTopic' === e.type && 'archived' !== e.status
                      ? (n = e)
                      : (console.error('Unknown topic type'), console.log(e))
                  }),
                  o(t),
                  u(n),
                  C)
                ) {
                  console.log('Has selected Topic')
                  var a = e.data.topics.filter(function (e) {
                    return e._id === C._id
                  })[0]
                  console.log('Updated selected Topic', a), P(a)
                }
              })
              .catch(function (e) {
                console.log(e)
              })
              .finally(function () {
                g(!1)
              })
          },
          F = function (e) {
            console.log(e), P(e), m(!0)
          }
        return O
          ? Object(a.jsx)($.a, { children: 'Loading ...' })
          : Object(a.jsxs)(a.Fragment, {
              children: [
                C &&
                  Object(a.jsx)(
                    ct,
                    { dialogOpen: v, setDialogOpen: m, topic: C, refresh: W },
                    null === C || void 0 === C ? void 0 : C._id
                  ),
                Object(a.jsxs)(ue.a, {
                  maxWidth: 'lg',
                  children: [
                    Object(a.jsx)($.a, {
                      align: 'center',
                      variant: 'h4',
                      children: 'Topic Management'
                    }),
                    Object(a.jsx)(N, {
                      I: 'takeActionPhaseTwo',
                      this: I,
                      children: Object(a.jsxs)(je.a, {
                        elevation: 2,
                        style: { marginTop: '20px' },
                        children: [
                          Object(a.jsx)($.a, {
                            variant: 'h6',
                            align: 'center',
                            children:
                              'Do you want to be available to supervise student defined projects? (Custom Student Projects)'
                          }),
                          Object(a.jsx)('center', {
                            children: Object(a.jsx)(ce.a, {
                              control: Object(a.jsx)(be.a, {
                                disabled: M,
                                checked: !!d,
                                onChange: function (e) {
                                  var t = { active: e.target.checked }
                                  console.log(t),
                                    D(!0),
                                    q
                                      .post(
                                        '/supervisor/me/studentProjectAvailibility',
                                        t
                                      )
                                      .then(function (e) {
                                        W()
                                      })
                                      .catch(function (e) {
                                        return console.log(e)
                                      })
                                      .finally(function () {
                                        D(!1)
                                      })
                                }
                              }),
                              label: 'Supervise Student Defined Projects'
                            })
                          })
                        ]
                      })
                    }),
                    Object(a.jsx)(pe.a, {
                      component: je.a,
                      style: { margin: '20px 0' },
                      children: Object(a.jsxs)(he.a, {
                        style: { minWidth: '650px' },
                        size: 'small',
                        children: [
                          Object(a.jsx)(Oe.a, {
                            children: Object(a.jsxs)(ge.a, {
                              children: [
                                Object(a.jsx)(xe.a, {
                                  children: 'Title (Edit Topic)'
                                }),
                                Object(a.jsx)(xe.a, {
                                  align: 'center',
                                  children: 'Type'
                                }),
                                Object(a.jsx)(xe.a, {
                                  align: 'center',
                                  children: 'Status'
                                }),
                                Object(a.jsx)(xe.a, {
                                  align: 'right',
                                  children: 'Proposals'
                                })
                              ]
                            })
                          }),
                          Object(a.jsxs)(fe.a, {
                            children: [
                              0 === r.length
                                ? Object(a.jsx)(ge.a, {
                                    children: Object(a.jsx)(xe.a, {
                                      component: 'th',
                                      scope: 'row',
                                      align: 'center',
                                      colSpan: 4,
                                      children: Object(a.jsx)($.a, {
                                        children:
                                          'No Supervisor Defined Topics to display'
                                      })
                                    })
                                  })
                                : r.map(function (e) {
                                    return Object(a.jsxs)(
                                      ge.a,
                                      {
                                        children: [
                                          Object(a.jsx)(xe.a, {
                                            component: 'th',
                                            scope: 'row',
                                            children: Object(a.jsx)(ve.a, {
                                              onClick: function () {
                                                return F(e)
                                              },
                                              children: e.title
                                            })
                                          }),
                                          Object(a.jsx)(xe.a, {
                                            align: 'center',
                                            children: 'Supervisor Defined'
                                          }),
                                          Object(a.jsx)(xe.a, {
                                            align: 'center',
                                            children: ye(e.status)
                                          }),
                                          4 === I.phase
                                            ? Object(a.jsx)(xe.a, {
                                                align: 'right',
                                                children: Object(a.jsx)(N, {
                                                  I: 'takeActionPhaseFour',
                                                  this: I,
                                                  children: Object(a.jsxs)(
                                                    i.b,
                                                    {
                                                      to: '/topic/'.concat(
                                                        e._id
                                                      ),
                                                      children: [
                                                        e.proposalCount,
                                                        ' Proposals'
                                                      ]
                                                    }
                                                  )
                                                })
                                              })
                                            : Object(a.jsx)(xe.a, {
                                                align: 'right',
                                                children:
                                                  'Proposals viewable in Phase 4'
                                              })
                                        ]
                                      },
                                      e._id
                                    )
                                  }),
                              d
                                ? Object(a.jsx)(a.Fragment, {
                                    children: Object(a.jsxs)(
                                      ge.a,
                                      {
                                        children: [
                                          Object(a.jsx)(xe.a, {
                                            component: 'th',
                                            scope: 'row',
                                            children: Object(a.jsx)(ve.a, {
                                              onClick: function () {
                                                return F(d)
                                              },
                                              children: d.title
                                            })
                                          }),
                                          Object(a.jsx)(xe.a, {
                                            align: 'center',
                                            children: 'Student Defined'
                                          }),
                                          Object(a.jsx)(xe.a, {
                                            align: 'center',
                                            children: ye(d.status)
                                          }),
                                          4 === I.phase
                                            ? Object(a.jsx)(xe.a, {
                                                align: 'right',
                                                children: Object(a.jsx)(N, {
                                                  I: 'takeActionPhaseFour',
                                                  this: I,
                                                  children: Object(a.jsxs)(
                                                    i.b,
                                                    {
                                                      to: '/topic/'.concat(
                                                        d._id
                                                      ),
                                                      children: [
                                                        d.proposalCount,
                                                        ' Proposals'
                                                      ]
                                                    }
                                                  )
                                                })
                                              })
                                            : Object(a.jsx)(xe.a, {
                                                align: 'right',
                                                children:
                                                  'Proposals viewable in Phase 4'
                                              })
                                        ]
                                      },
                                      d._id
                                    )
                                  })
                                : null
                            ]
                          })
                        ]
                      })
                    }),
                    Object(a.jsx)(N, {
                      I: 'takeActionPhaseTwo',
                      this: I,
                      children: Object(a.jsx)('div', {
                        style: { display: 'flex', flexDirection: 'row' },
                        children: Object(a.jsx)(ke, {
                          type: 'button',
                          onClick: function () {
                            return L.push('/topics/add')
                          },
                          style: { flex: 1, flexGrow: 4 },
                          children: 'Add new Topic Suggestion'
                        })
                      })
                    })
                  ]
                })
              ]
            })
      }
      var lt = n(22),
        dt = n(493),
        ut = { tags: [], supervisor: 'unspecified', topicType: 'all' }
      function jt(e) {
        var t = Object(s.useState)([]),
          n = Object(p.a)(t, 2),
          r = n[0],
          o = n[1],
          c = Object(s.useState)(!0),
          l = Object(p.a)(c, 2),
          d = l[0],
          u = l[1],
          j = Object(s.useState)([]),
          b = Object(p.a)(j, 2),
          h = b[0],
          O = b[1],
          g = Object(Ae.c)({ reValidateMode: 'onChange', defaultValues: ut }),
          x = g.handleSubmit,
          f = g.errors,
          v = g.control
        Object(s.useEffect)(function () {
          q
            .post('/topic/search')
            .then(function (e) {
              var t
              console.log(e),
                (null === (t = e.data) || void 0 === t ? void 0 : t.topics) &&
                  o(e.data.topics)
            })
            .catch(function (e) {
              console.log(e)
            })
            .finally(function () {
              u(!1)
            }),
            q
              .get('/supervisor/list')
              .then(function (e) {
                console.log(e), O(e.data.supervisors)
              })
              .catch(function (e) {
                console.log(e)
              })
              .finally(function () {})
        }, [])
        return Object(a.jsxs)(ue.a, {
          maxWidth: 'lg',
          children: [
            Object(a.jsx)($.a, {
              variant: 'h3',
              component: 'h1',
              children: 'Topic List'
            }),
            Object(a.jsxs)('form', {
              onSubmit: x(function (e) {
                console.log(e)
                var t = { tags: null, supervisor: null, topicType: null }
                e.tags.length > 0 && (t.tags = Object(lt.a)(e.tags)),
                  'unspecified' !== e.supervisor &&
                    (t.supervisor = e.supervisor),
                  (t.topicType = e.topicType),
                  console.log('Querying DB for', t),
                  q
                    .post('/topic/search', t)
                    .then(function (e) {
                      console.log(e), o(e.data.topics)
                    })
                    .catch(function (e) {
                      console.log(e)
                    })
              }),
              children: [
                Object(a.jsx)(Ae.a, {
                  control: v,
                  name: 'tags',
                  render: function (e) {
                    var t,
                      n = e.onChange,
                      s = e.value
                    return Object(a.jsx)(Xe, {
                      value: s,
                      onChange: function (e) {
                        n(e)
                      },
                      error: !!(null === f || void 0 === f ? void 0 : f.tags),
                      helperText:
                        null === f ||
                        void 0 === f ||
                        null === (t = f.tags) ||
                        void 0 === t
                          ? void 0
                          : t.message
                    })
                  }
                }),
                Object(a.jsxs)(Be.a, {
                  variant: 'outlined',
                  children: [
                    Object(a.jsx)('label', { children: 'Supervisor' }),
                    Object(a.jsx)(Ae.a, {
                      render: function (e) {
                        var t = e.onChange,
                          n = e.value
                        return Object(a.jsxs)(qe.a, {
                          value: n,
                          onChange: t,
                          children: [
                            Object(a.jsx)(
                              ze.a,
                              {
                                value: 'unspecified',
                                selected: !0,
                                children: 'None'
                              },
                              'unspecified'
                            ),
                            h.map(function (e) {
                              return Object(a.jsx)(
                                ze.a,
                                { value: e._id, children: e.displayName },
                                e._id
                              )
                            })
                          ]
                        })
                      },
                      name: 'supervisor',
                      control: v
                    })
                  ]
                }),
                Object(a.jsxs)(Be.a, {
                  variant: 'outlined',
                  children: [
                    Object(a.jsx)('label', { children: 'Topic Type' }),
                    Object(a.jsx)(Ae.a, {
                      render: function (e) {
                        var t = e.onChange,
                          n = e.value
                        return Object(a.jsxs)(qe.a, {
                          value: n,
                          onChange: t,
                          children: [
                            Object(a.jsx)(
                              ze.a,
                              { value: 'all', selected: !0, children: 'All' },
                              'all'
                            ),
                            Object(a.jsx)(
                              ze.a,
                              {
                                value: 'regular',
                                children: 'Supervisor Defined'
                              },
                              'regular'
                            ),
                            Object(a.jsx)(
                              ze.a,
                              {
                                value: 'studentTopic',
                                children: 'Student Defined'
                              },
                              'studentTopic'
                            )
                          ]
                        })
                      },
                      name: 'topicType',
                      control: v
                    })
                  ]
                }),
                Object(a.jsx)(ke, { children: 'Search' })
              ]
            }),
            Object(a.jsx)(pe.a, {
              component: je.a,
              style: { margin: '20px 0' },
              children: Object(a.jsxs)(he.a, {
                style: { minWidth: '650px' },
                size: 'medium',
                children: [
                  Object(a.jsx)(Oe.a, {
                    children: Object(a.jsx)(ge.a, {
                      children: Object(a.jsx)(xe.a, {
                        colSpan: 5,
                        children: 'Found '.concat(r.length, ' matching topics')
                      })
                    })
                  }),
                  Object(a.jsx)(fe.a, {
                    children:
                      0 === r.length
                        ? Object(a.jsx)(ge.a, {
                            children: Object(a.jsx)(xe.a, {
                              component: 'th',
                              scope: 'row',
                              align: 'center',
                              colSpan: 3,
                              children: Object(a.jsx)($.a, {
                                children: d
                                  ? 'Loading Topics ...'
                                  : 'No Topics to display'
                              })
                            })
                          })
                        : r.map(function (e) {
                            return Object(a.jsxs)(
                              ge.a,
                              {
                                children: [
                                  Object(a.jsx)(xe.a, {
                                    component: 'th',
                                    scope: 'row',
                                    children: Object(a.jsx)(i.b, {
                                      to: './topics/view/' + e._id,
                                      children: Object(a.jsx)(ve.a, {
                                        component: 'p',
                                        children: e.title
                                      })
                                    })
                                  }),
                                  Object(a.jsx)(xe.a, {
                                    align: 'center',
                                    children: e.supervisor.displayName
                                  }),
                                  Object(a.jsx)(xe.a, {
                                    children: Object(a.jsxs)('div', {
                                      style: {
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignContent: 'center',
                                        justifyContent: 'right'
                                      },
                                      children: [
                                        e.tags.slice(0, 3).map(function (e) {
                                          return Object(a.jsx)(
                                            dt.a,
                                            {
                                              style: {
                                                backgroundColor: '#dbdbdb',
                                                color: '#5b5b5b',
                                                margin: '0 3px',
                                                padding: '4px',
                                                borderRadius: '3px'
                                              },
                                              children: e
                                            },
                                            e
                                          )
                                        }),
                                        e.tags.length > 3
                                          ? Object(a.jsx)(
                                              dt.a,
                                              {
                                                style: {
                                                  backgroundColor: '#dbdbdb',
                                                  color: '#5b5b5b',
                                                  margin: '0 3px',
                                                  padding: '4px',
                                                  borderRadius: '3px'
                                                },
                                                children:
                                                  '+ ' +
                                                  (e.tags.length - 3) +
                                                  ' more'
                                              },
                                              'additional_tags'
                                            )
                                          : null
                                      ]
                                    })
                                  }),
                                  Object(a.jsxs)(xe.a, {
                                    align: 'right',
                                    children: [
                                      e.proposalCount,
                                      ' ',
                                      e.proposalCount < 2
                                        ? 'Student has '
                                        : 'Students have ',
                                      'shown interest'
                                    ]
                                  })
                                ]
                              },
                              e.id
                            )
                          })
                  })
                ]
              })
            })
          ]
        })
      }
      var bt = n(497),
        pt = n(477),
        ht = n(240),
        Ot = n.n(ht),
        gt = function (e) {
          return Object(a.jsx)(pt.a, {
            in: e.open,
            children: Object(a.jsx)(bt.a, {
              severity: e.severity,
              action: Object(a.jsx)(Ne.a, {
                'aria-label': 'close',
                color: 'inherit',
                size: 'small',
                onClick: function () {
                  e.setOpen(!1)
                },
                children: Object(a.jsx)(Ot.a, { fontSize: 'inherit' })
              }),
              children: e.message
            })
          })
        }
      gt.defaultProps = { message: 'No Message Supplied', severity: 'info' }
      var xt = gt,
        ft = function (e) {
          var t,
            n,
            r,
            o,
            c = Object(s.useState)({
              message: 'No Message Supplied',
              severity: 'info'
            }),
            i = Object(p.a)(c, 2),
            l = i[0],
            d = i[1],
            u = Object(s.useState)(!1),
            j = Object(p.a)(u, 2),
            b = j[0],
            O = (j[1], Object(s.useState)(!1)),
            g = Object(p.a)(O, 2),
            x = g[0],
            f = g[1],
            v = Object(h.f)(),
            y = Object(Ae.c)({
              resolver: Object(De.yupResolver)(Fe),
              reValidateMode: 'onChange',
              defaultValues: Le
            }),
            S = y.register,
            C = y.handleSubmit,
            P = y.errors,
            T = y.control,
            w = Object(s.useContext)(m).user
          return Object(a.jsxs)(ue.a, {
            component: 'main',
            maxWidth: 'md',
            children: [
              Object(a.jsx)($.a, {
                component: 'h1',
                variant: 'h4',
                align: 'center',
                children: 'Create new Topic'
              }),
              Object(a.jsxs)('form', {
                onSubmit: C(function (e) {
                  console.log(e),
                    (e.ownerType = w.role.toLowerCase()),
                    f(!0),
                    q
                      .post('/topic/add', e)
                      .then(function (e) {
                        console.log(e), v.push('/topics/manage')
                      })
                      .catch(function (e) {
                        console.log(e),
                          d({
                            message: 'Could not add topic',
                            severity: 'error'
                          })
                      })
                      .finally(function () {
                        f(!1)
                      })
                }),
                autoComplete: 'off',
                children: [
                  Object(a.jsx)(Je, {
                    inputRef: S,
                    type: 'text',
                    name: 'title',
                    label: 'Title',
                    error: !!P.title,
                    helperText:
                      null === P ||
                      void 0 === P ||
                      null === (t = P.title) ||
                      void 0 === t
                        ? void 0
                        : t.message
                  }),
                  Object(a.jsx)(Ge, {
                    inputRef: S,
                    type: 'text',
                    name: 'description',
                    label: 'Description',
                    error: !!P.description,
                    helperText:
                      null === P ||
                      void 0 === P ||
                      null === (n = P.description) ||
                      void 0 === n
                        ? void 0
                        : n.message
                  }),
                  Object(a.jsx)(Ae.a, {
                    control: T,
                    name: 'tags',
                    render: function (e) {
                      var t,
                        n = e.onChange,
                        s = e.value
                      return Object(a.jsx)(Xe, {
                        value: s,
                        onChange: function (e) {
                          n(e)
                        },
                        error: !!(null === P || void 0 === P ? void 0 : P.tags),
                        helperText:
                          null === P ||
                          void 0 === P ||
                          null === (t = P.tags) ||
                          void 0 === t
                            ? void 0
                            : t.message
                      })
                    }
                  }),
                  Object(a.jsx)(Ge, {
                    inputRef: S,
                    type: 'text',
                    name: 'additionalNotes',
                    label: 'Additional Notes (Optional)',
                    error: !!P.additionalNotes,
                    helperText:
                      null === P ||
                      void 0 === P ||
                      null === (r = P.additionalNotes) ||
                      void 0 === r
                        ? void 0
                        : r.message
                  }),
                  Object(a.jsx)(tt, {
                    control: T,
                    label: 'Target Courses (Optional)',
                    error: !!P.targetCourses,
                    helperText:
                      null === P ||
                      void 0 === P ||
                      null === (o = P.targetCourses) ||
                      void 0 === o
                        ? void 0
                        : o.message
                  }),
                  Object(a.jsx)(ke, { loading: x, children: 'Add Topic' }),
                  Object(a.jsx)('br', {}),
                  Object(a.jsx)(xt, {
                    open: b,
                    message: l.message,
                    severity: l.severity
                  })
                ]
              })
            ]
          })
        },
        vt = Object(Pe.a)(function (e) {
          return {
            countdown: {
              margin: '10px auto',
              paddingBottom: '20px',
              textAlign: 'center'
            },
            countdownCol: { display: 'inline-block' },
            countdownColElement: {
              margin: '0 20px',
              display: 'flex',
              flexDirection: 'column',
              '& strong': { fontSize: '50px' }
            }
          }
        }),
        mt = function (e) {
          var t = Object(s.useState)({
              days: ' - ',
              hours: ' - ',
              min: ' - ',
              sec: ' - '
            }),
            n = Object(p.a)(t, 2),
            r = n[0],
            o = n[1],
            c = Object(s.useState)(),
            i = Object(p.a)(c, 2),
            l = i[0],
            d = i[1],
            u = vt()
          Object(s.useEffect)(function () {
            d(
              setInterval(function () {
                var t = j(e.date)
                t ? o(t) : b()
              }, 1e3)
            )
          }, [])
          var j = function (e) {
              var t = (Date.parse(new Date(e)) - Date.parse(new Date())) / 1e3
              if (t <= 0) return !1
              var n = { years: 0, days: 0, hours: 0, min: 0, sec: 0 }
              return (
                t >= 31557600 &&
                  ((n.years = Math.floor(t / 31557600)),
                  (t -= 365.25 * n.years * 86400)),
                t >= 86400 &&
                  ((n.days = Math.floor(t / 86400)), (t -= 86400 * n.days)),
                t >= 3600 &&
                  ((n.hours = Math.floor(t / 3600)), (t -= 3600 * n.hours)),
                t >= 60 && ((n.min = Math.floor(t / 60)), (t -= 60 * n.min)),
                (n.sec = t),
                n
              )
            },
            b = function () {
              clearInterval(l)
            },
            h = function (e) {
              for (e = String(e); e.length < 2; ) e = '0' + e
              return e
            }
          return Object(a.jsxs)('div', {
            className: u.countdown,
            children: [
              Object(a.jsx)('span', {
                className: u.countdownCol,
                children: Object(a.jsxs)('span', {
                  className: u.countdownColElement,
                  children: [
                    Object(a.jsx)('strong', { children: h(r.days) }),
                    Object(a.jsx)('span', {
                      children: 1 === r.days ? 'Day' : 'Days'
                    })
                  ]
                })
              }),
              Object(a.jsx)('span', {
                className: u.countdownCol,
                children: Object(a.jsxs)('span', {
                  className: u.countdownColElement,
                  children: [
                    Object(a.jsx)('strong', { children: h(r.hours) }),
                    Object(a.jsx)('span', { children: 'Hours' })
                  ]
                })
              }),
              Object(a.jsx)('span', {
                className: u.countdownCol,
                children: Object(a.jsxs)('span', {
                  className: u.countdownColElement,
                  children: [
                    Object(a.jsx)('strong', { children: h(r.min) }),
                    Object(a.jsx)('span', { children: 'Min' })
                  ]
                })
              }),
              Object(a.jsx)('span', {
                className: u.countdownCol,
                children: Object(a.jsxs)('span', {
                  className: u.countdownColElement,
                  children: [
                    Object(a.jsx)('strong', { children: h(r.sec) }),
                    Object(a.jsx)('span', { children: 'Sec' })
                  ]
                })
              })
            ]
          })
        }
      mt.defaultProps = { date: new Date() }
      var yt = mt,
        St = Object(Pe.a)(function (e) {
          return {
            phaseBreakdownTitle: { fontSize: '32px' },
            phaseTitle: { fontSize: '25px' }
          }
        })
      var Ct = function () {
        var e = Object(s.useContext)(T).currentPhase
        return (
          Object(s.useContext)(m).user,
          St(),
          console.log(e),
          Object(a.jsxs)(ue.a, {
            maxWidth: 'lg',
            children: [
              Object(a.jsx)($.a, {
                align: 'center',
                variant: 'h3',
                style: { margin: '40px' },
                children: 'Final Year Project Management System'
              }),
              Object(a.jsx)($.a, {
                style: { margin: '20px' },
                align: 'center',
                children: 'Welcome to the FYP Management system.'
              }),
              Object(a.jsx)($.a, { varint: 'paragraph' }),
              Object(a.jsxs)($.a, {
                style: { fontSize: '40px' },
                align: 'center',
                children: [
                  'Current Phase',
                  ' ',
                  Object(a.jsx)('span', {
                    style: { fontWeight: 'bold' },
                    children: e.phase
                  })
                ]
              }),
              e.phase > 0 && e.phase < 4
                ? Object(a.jsxs)(a.Fragment, {
                    children: [
                      Object(a.jsx)(yt, { date: e.endDate.toString() }),
                      Object(a.jsx)($.a, {
                        style: { fontSize: '35px' },
                        align: 'center',
                        children: 'until next phase'
                      })
                    ]
                  })
                : null
            ]
          })
        )
      }
      function Pt(e) {
        return Object(a.jsx)(ke, {
          disabled: e.disabled,
          loading: e.loading,
          onClick: e.onUpload,
          children: 'Upload All'
        })
      }
      var Tt = n(241),
        wt = r.a.createRef(),
        kt = { header: !0 }
      function At(e) {
        var t = function (e) {
            wt.current && wt.current.open(e)
          },
          n = function (e) {
            wt.current && wt.current.removeFile(e)
          }
        return Object(a.jsx)(a.Fragment, {
          children: Object(a.jsx)(Tt.a, {
            config: kt,
            ref: wt,
            onFileLoad: function (t) {
              console.log(t)
              var n,
                a = [],
                s = Object(u.a)(t)
              try {
                for (s.s(); !(n = s.n()).done; ) {
                  var r = n.value.data.email
                  r && '' !== r
                    ? (console.log(r), a.push(r))
                    : console.log(r, 'is being skipped')
                }
              } catch (o) {
                s.e(o)
              } finally {
                s.f()
              }
              e.onAdd(a)
            },
            onError: function (e, t, n, a) {
              console.log('---------------------------'),
                console.log(e),
                console.log('---------------------------')
            },
            noClick: !0,
            noDrag: !0,
            noProgressBar: !0,
            onRemoveFile: function (e) {
              console.log('---------------------------'),
                console.log(e),
                console.log('---------------------------')
            },
            children: function (e) {
              var s = e.file
              return Object(a.jsxs)('aside', {
                style: {
                  display: 'flex',
                  flexDirection: 'row',
                  marginBottom: 10
                },
                children: [
                  Object(a.jsx)(de.a, {
                    onClick: t,
                    variant: 'contained',
                    color: 'primary',
                    style: {
                      borderRadius: 0,
                      marginTop: 5,
                      marginLeft: 0,
                      marginRight: 0,
                      width: '40%',
                      height: 50,
                      paddingLeft: 0,
                      paddingRight: 0
                    },
                    children: 'Browse file'
                  }),
                  Object(a.jsx)('div', {
                    style: {
                      borderWidth: 1,
                      borderStyle: 'solid',
                      borderColor: '#ccc',
                      height: 45,
                      lineHeight: 2.5,
                      marginTop: 5,
                      marginBottom: 5,
                      paddingLeft: 13,
                      paddingTop: 3,
                      width: '60%'
                    },
                    children: s && s.name
                  }),
                  Object(a.jsx)(de.a, {
                    variant: 'contained',
                    onClick: n,
                    style: {
                      borderRadius: 0,
                      marginTop: 5,
                      marginLeft: 0,
                      marginRight: 0,
                      width: '10%',
                      height: 50,
                      paddingLeft: 0,
                      paddingRight: 0
                    },
                    children: 'Remove'
                  })
                ]
              })
            }
          })
        })
      }
      var Nt = n(256),
        _t = n(478),
        Et = n(420),
        Rt = n(479),
        Mt = Object(Et.a)(function (e) {
          return {
            root: {
              padding: '2px 0px',
              display: 'flex',
              alignItems: 'center',
              width: '100%'
            },
            input: { marginLeft: e.spacing(1), flex: 1 },
            iconButton: { padding: 10 },
            divider: { height: 28, margin: 4 }
          }
        })
      function Dt(e) {
        var t = Mt()
        return Object(a.jsxs)(je.a, {
          component: 'form',
          className: t.root,
          children: [
            Object(a.jsx)(Nt.a, {
              className: t.input,
              placeholder: 'Student Email',
              value: e.email,
              inputProps: { 'aria-label': 'Student Email' },
              endAdornment: e.endAdornment,
              onChange: e.onChange
            }),
            Object(a.jsx)(_t.a, {
              title: 'Include @studentmail prefix',
              'aria-label': 'Include @studentmail prefix',
              children: Object(a.jsx)(ie.a, {
                edge: 'start',
                disableRipple: !0,
                checked: e.includeEmailPrefix,
                onChange: e.onChangeEmailPrefix
              })
            }),
            Object(a.jsx)(_e.a, {
              className: t.divider,
              orientation: 'vertical'
            }),
            Object(a.jsx)(Ne.a, {
              className: t.iconButton,
              'aria-label': 'search',
              onClick: e.onAdd,
              children: Object(a.jsx)(Rt.a, {})
            })
          ]
        })
      }
      var It = n(154),
        Lt = n.n(It),
        Wt = n(155),
        Ft = n.n(Wt),
        Ut = n(480),
        Bt = n(500),
        qt = n(156),
        zt = n.n(qt),
        Vt = Object(Pe.a)(function (e) {
          return {
            root: { flexShrink: 0, marginLeft: e.spacing(2.5) },
            assigned: { color: 'green' },
            not_found: { color: 'red' },
            exists: { color: 'orange' },
            no_assignment: { color: 'red' }
          }
        })
      function Ht(e) {
        var t = Vt(),
          n = e.count,
          s = e.page,
          r = e.rowsPerPage,
          o = e.onChangePage
        return Object(a.jsxs)('div', {
          className: t.root,
          children: [
            Object(a.jsx)(Ne.a, {
              onClick: function (e) {
                o(e, s - 1)
              },
              disabled: 0 === s,
              'aria-label': 'previous page',
              children: Object(a.jsx)(Lt.a, {})
            }),
            Object(a.jsx)(Ne.a, {
              onClick: function (e) {
                o(e, s + 1)
              },
              disabled: s >= Math.ceil(n / r) - 1,
              'aria-label': 'next page',
              children: Object(a.jsx)(Ft.a, {})
            })
          ]
        })
      }
      var Gt = {
          exists: 'Exists: This user is already assigned this role',
          not_found:
            'Not Found: Email could not be linked to an active user account',
          assigned: 'The role was sucessfully assigned to this user'
        },
        Yt = function (e) {
          var t = Object(s.useState)(e.value),
            n = Object(p.a)(t, 2),
            r = n[0],
            o = n[1],
            c = Object(s.useState)(0),
            i = Object(p.a)(c, 2),
            l = i[0],
            d = i[1],
            u = Object(s.useState)(5),
            j = Object(p.a)(u, 2),
            b = j[0],
            h = j[1]
          Object(s.useEffect)(
            function () {
              o(e.value)
            },
            [e.value]
          )
          var O = Vt()
          return Object(a.jsx)(pe.a, {
            component: je.a,
            children: Object(a.jsxs)(he.a, {
              'aria-label': 'simple table',
              children: [
                Object(a.jsx)(Oe.a, {
                  children: Object(a.jsxs)(ge.a, {
                    children: [
                      Object(a.jsx)(xe.a, { children: 'Email' }),
                      e.removableEntries
                        ? Object(a.jsx)(xe.a, {
                            align: 'right',
                            children: 'Actions'
                          })
                        : null
                    ]
                  })
                }),
                Object(a.jsx)(fe.a, {
                  children:
                    0 === r.length
                      ? Object(a.jsx)(ge.a, {
                          children: Object(a.jsx)(xe.a, {
                            colspan: e.removableEntries ? 2 : 1,
                            children: 'No Users to display'
                          })
                        })
                      : (b > 0 ? r.slice(l * b, l * b + b) : r).map(function (
                          t
                        ) {
                          return Object(a.jsxs)(
                            ge.a,
                            {
                              children: [
                                Object(a.jsx)(_t.a, {
                                  title: (
                                    null === t || void 0 === t
                                      ? void 0
                                      : t.status
                                  )
                                    ? Gt[t.status]
                                    : t.email,
                                  children: Object(a.jsx)(xe.a, {
                                    className: (
                                      null === t || void 0 === t
                                        ? void 0
                                        : t.status
                                    )
                                      ? O[t.status]
                                      : '',
                                    children: t.email
                                  })
                                }),
                                e.removableEntries
                                  ? Object(a.jsx)(xe.a, {
                                      align: 'right',
                                      children: Object(a.jsx)(de.a, {
                                        variant: 'outlined',
                                        color: 'secondary',
                                        startIcon: Object(a.jsx)(zt.a, {}),
                                        onClick: function () {
                                          return e.removeEntry(t.email)
                                        },
                                        children: 'Remove'
                                      })
                                    })
                                  : null
                              ]
                            },
                            t.id
                          )
                        })
                }),
                Object(a.jsx)(Ut.a, {
                  children: Object(a.jsx)(ge.a, {
                    children: Object(a.jsx)(Bt.a, {
                      rowsPerPageOptions: [
                        5,
                        10,
                        25,
                        { label: 'All', value: -1 }
                      ],
                      colSpan: 3,
                      count: r.length,
                      rowsPerPage: b,
                      page: l,
                      SelectProps: {
                        inputProps: { 'aria-label': 'rows per page' },
                        native: !0
                      },
                      onChangePage: function (e, t) {
                        d(t)
                      },
                      onChangeRowsPerPage: function (e) {
                        h(parseInt(e.target.value, 10)), d(0)
                      },
                      ActionsComponent: Ht
                    })
                  })
                })
              ]
            })
          })
        },
        Jt = n(244),
        Kt = n.n(Jt),
        Zt = n(243),
        Qt = n.n(Zt),
        Xt = Object(Pe.a)(function (e) {
          return { button: { margin: e.spacing(1) } }
        }),
        $t = function (e) {
          var t = Xt(),
            n = Object(h.f)()
          return e.dense
            ? Object(a.jsx)(
                Ne.a,
                Object(b.a)(
                  Object(b.a)(
                    {
                      className: t.button,
                      onClick: function () {
                        n.goBack()
                      }
                    },
                    e
                  ),
                  {},
                  { children: Object(a.jsx)(Qt.a, {}) }
                )
              )
            : Object(a.jsx)(
                de.a,
                Object(b.a)(
                  Object(b.a)(
                    {
                      variant: 'contained',
                      color: 'primary',
                      className: t.button,
                      startIcon: Object(a.jsx)(Kt.a, {}),
                      onClick: function () {
                        return n.goBack()
                      }
                    },
                    e
                  ),
                  {},
                  { children: 'Go Back' }
                )
              )
        }
      $t.defaultProps = { dense: !1 }
      var en = $t,
        tn = function (e) {
          var t = Object(s.useState)(''),
            n = Object(p.a)(t, 2),
            r = n[0],
            o = n[1],
            c = Object(s.useState)([]),
            i = Object(p.a)(c, 2),
            l = i[0],
            b = i[1],
            h = Object(s.useState)(!0),
            O = Object(p.a)(h, 2),
            g = O[0],
            x = O[1],
            f = Object(s.useState)({}),
            v = Object(p.a)(f, 2),
            m = v[0],
            y = v[1],
            S = Object(s.useState)(!1),
            C = Object(p.a)(S, 2),
            P = C[0],
            T = C[1],
            w = Object(s.useState)(!1),
            k = Object(p.a)(w, 2),
            A = k[0],
            N = k[1],
            _ = (function () {
              var e = Object(j.a)(
                d.a.mark(function e(t) {
                  var n
                  return d.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          if (0 !== l.length) {
                            e.next = 2
                            break
                          }
                          return e.abrupt(
                            'return',
                            console.log(
                              'Please enter some student emails before uploading'
                            )
                          )
                        case 2:
                          ;(n = { students: l }),
                            console.log('Uploading: ', n),
                            N(!0),
                            q
                              .post('/student/assign', n)
                              .then(function (e) {
                                if (
                                  (console.log(e.data),
                                  e.data.students.length > 0)
                                ) {
                                  var t,
                                    n = Object(lt.a)(l),
                                    a = l.map(function (e) {
                                      return e.email
                                    }),
                                    s = Object(u.a)(e.data.students)
                                  try {
                                    for (s.s(); !(t = s.n()).done; ) {
                                      var r = t.value,
                                        o = a.indexOf(r.email)
                                      o < 0 || (n[o].status = r.status)
                                    }
                                  } catch (i) {
                                    s.e(i)
                                  } finally {
                                    s.f()
                                  }
                                  var c = n.filter(function (e) {
                                    return ![
                                      'assigned',
                                      'exists',
                                      void 0
                                    ].includes(
                                      null === e || void 0 === e
                                        ? void 0
                                        : e.status
                                    )
                                  })
                                  return (
                                    console.log(c),
                                    c.length > 0
                                      ? y({
                                          message:
                                            'Could not add the following student emails (Hover email for more details)',
                                          severity: 'error'
                                        })
                                      : y({
                                          message:
                                            'All students were sucessfully added',
                                          severity: 'success'
                                        }),
                                    T(!0),
                                    b(c)
                                  )
                                }
                                b([]),
                                  y({
                                    message:
                                      'All students were sucessfully added',
                                    severity: 'success'
                                  }),
                                  T(!0)
                              })
                              .catch(function (e) {
                                console.log(e)
                              })
                              .finally(function () {
                                N(!1)
                              })
                        case 6:
                        case 'end':
                          return e.stop()
                      }
                  }, e)
                })
              )
              return function (t) {
                return e.apply(this, arguments)
              }
            })(),
            E = g
              ? Object(a.jsx)('span', {
                  style: { fontSize: '10px', color: 'gray', marginRight: 10 },
                  children: '@studentmail.ul.ie'
                })
              : ''
          return Object(a.jsxs)(ue.a, {
            maxWidth: 'lg',
            children: [
              Object(a.jsx)(en, {}),
              Object(a.jsx)($.a, {
                variant: 'h6',
                children: 'Upload CSV file'
              }),
              Object(a.jsx)(At, {
                onAdd: function (e) {
                  var t = Object(lt.a)(l)
                  console.log('studentsList', t), console.log('bulkStudents', e)
                  var n,
                    a = Object(u.a)(e)
                  try {
                    for (a.s(); !(n = a.n()).done; ) {
                      var s = n.value
                      if (!s || 0 === s.length)
                        return void console.log('Skipping', s)
                      t.push({ id: t.length, email: s })
                    }
                  } catch (r) {
                    a.e(r)
                  } finally {
                    a.f()
                  }
                  b(t)
                }
              }),
              Object(a.jsx)('br', {}),
              Object(a.jsx)(_e.a, {}),
              Object(a.jsx)('br', {}),
              Object(a.jsx)($.a, {
                variant: 'h6',
                children: 'Add Individual Student'
              }),
              Object(a.jsx)(Dt, {
                email: r,
                endAdornment: E,
                onChange: function (e) {
                  o(e.target.value)
                },
                includeEmailPrefix: g,
                onChangeEmailPrefix: function (e) {
                  x(e.target.checked)
                },
                onAdd: function (e) {
                  if (0 === r.length)
                    return (
                      y({
                        message: 'Cannot add empty email!',
                        severity: 'warning'
                      }),
                      void T(!0)
                    )
                  if (
                    l.filter(function (e) {
                      return e.email === r
                    }).length > 0
                  )
                    return (
                      y({
                        message: 'Cannot add duplicate email!',
                        severity: 'warning'
                      }),
                      void T(!0)
                    )
                  var t =
                      -1 === r.indexOf('@') && g ? '@studentmail.ul.ie' : '',
                    n = r.trim() + t
                  if (!/\S+@\S+\.\S+/.test(n))
                    return (
                      y({
                        message: 'Cannot add invalid email!',
                        severity: 'warning'
                      }),
                      void T(!0)
                    )
                  var a = Object(lt.a)(l)
                  a.push({ email: n }), o(''), b(a)
                }
              }),
              Object(a.jsx)('br', {}),
              Object(a.jsx)(xt, {
                open: P,
                setOpen: T,
                message: m.message,
                severity: m.severity
              }),
              Object(a.jsx)('br', {}),
              Object(a.jsx)(Yt, {
                value: l,
                removableEntries: !0,
                removeEntry: function (e) {
                  var t = l.filter(function (t) {
                    return t.email !== e
                  })
                  b(t)
                }
              }),
              Object(a.jsx)(Pt, {
                disabled: !l.length,
                loading: A,
                onUpload: _
              }),
              Object(a.jsx)(ke, {
                type: 'button',
                color: 'secondary',
                onClick: function () {
                  b([]), T(!1)
                },
                children: 'Clear Student List'
              })
            ]
          })
        },
        nn = n(482),
        an = Object(Pe.a)(function (e) {
          return { root: { flexShrink: 0, marginLeft: e.spacing(2.5) } }
        })
      var sn = function (e) {
          var t = an(),
            n = e.count,
            s = e.page,
            r = e.rowsPerPage,
            o = e.onChangePage
          return Object(a.jsxs)('div', {
            className: t.root,
            children: [
              Object(a.jsx)(Ne.a, {
                onClick: function (e) {
                  o(e, s - 1)
                },
                disabled: 0 === s,
                'aria-label': 'previous page',
                children: Object(a.jsx)(Lt.a, {})
              }),
              Object(a.jsx)(Ne.a, {
                onClick: function (e) {
                  o(e, s + 1)
                },
                disabled: s >= Math.ceil(n / r) - 1,
                'aria-label': 'next page',
                children: Object(a.jsx)(Ft.a, {})
              })
            ]
          })
        },
        rn = function (e) {
          var t = e.values,
            n = e.remove,
            r = e.removing,
            o =
              (Object(Se.a)(e, ['values', 'remove', 'removing']),
              Object(s.useState)(0)),
            c = Object(p.a)(o, 2),
            i = c[0],
            l = c[1],
            d = Object(s.useState)(5),
            u = Object(p.a)(d, 2),
            j = u[0],
            b = u[1]
          return Object(a.jsx)(pe.a, {
            component: je.a,
            children: Object(a.jsxs)(he.a, {
              'aria-label': 'simple table',
              children: [
                Object(a.jsx)(Oe.a, {
                  children: Object(a.jsxs)(ge.a, {
                    children: [
                      Object(a.jsx)(xe.a, { children: 'Email' }),
                      Object(a.jsx)(xe.a, {
                        align: 'right',
                        children: 'Actions'
                      })
                    ]
                  })
                }),
                Object(a.jsx)(fe.a, {
                  children:
                    0 === t.length
                      ? Object(a.jsx)(ge.a, {
                          children: Object(a.jsx)(xe.a, {
                            colSpan: 3,
                            align: 'center',
                            children: 'No Students to show'
                          })
                        })
                      : (j > 0 ? t.slice(i * j, i * j + j) : t).map(function (
                          e
                        ) {
                          return Object(a.jsxs)(
                            ge.a,
                            {
                              children: [
                                Object(a.jsx)(xe.a, { children: e.email }),
                                Object(a.jsx)(xe.a, {
                                  align: 'right',
                                  children: Object(a.jsx)(ke, {
                                    onClick: function () {
                                      return n(e._id)
                                    },
                                    style: {
                                      width: '25%',
                                      margin: '0 0 0 5px'
                                    },
                                    color: 'secondary',
                                    startIcon: Object(a.jsx)(nn.a, {}),
                                    loading: r === e._id,
                                    children: 'Delete'
                                  })
                                })
                              ]
                            },
                            e.id
                          )
                        })
                }),
                Object(a.jsx)(Ut.a, {
                  children: Object(a.jsx)(ge.a, {
                    children: Object(a.jsx)(Bt.a, {
                      rowsPerPageOptions: [
                        5,
                        10,
                        25,
                        { label: 'All', value: -1 }
                      ],
                      colSpan: 3,
                      count: t.length,
                      rowsPerPage: j,
                      page: i,
                      SelectProps: {
                        inputProps: { 'aria-label': 'rows per page' },
                        native: !0
                      },
                      onChangePage: function (e, t) {
                        l(t)
                      },
                      onChangeRowsPerPage: function (e) {
                        b(parseInt(e.target.value, 10)), l(0)
                      },
                      ActionsComponent: sn
                    })
                  })
                })
              ]
            })
          })
        },
        on = function (e) {
          var t = Object(s.useState)([]),
            n = Object(p.a)(t, 2),
            r = n[0],
            o = n[1],
            c = Object(s.useState)([]),
            l = Object(p.a)(c, 2),
            d = l[0],
            u = l[1],
            j = Object(s.useState)(!0),
            b = Object(p.a)(j, 2),
            h = b[0],
            O = b[1],
            g = Object(s.useState)(''),
            x = Object(p.a)(g, 2),
            f = x[0],
            v = x[1],
            m = Object(s.useState)({}),
            y = Object(p.a)(m, 2),
            S = y[0],
            C = y[1],
            P = Object(s.useState)(!1),
            T = Object(p.a)(P, 2),
            w = T[0],
            k = T[1]
          Object(s.useEffect)(function () {
            A()
          }, [])
          var A = function () {
            q.get('/student')
              .then(function (e) {
                console.log(e), o(e.data.students), u(e.data.students)
              })
              .catch(function (e) {
                switch (e) {
                  case 'error_retrieving_students':
                    C({
                      message: 'Could not retrieve students from database',
                      severity: 'warning'
                    })
                    break
                  default:
                    C({
                      message: 'An error occurred, please try again',
                      severity: 'error'
                    })
                }
                k(!0)
              })
              .finally(function () {
                O(!1)
              })
          }
          return h
            ? Object(a.jsx)('p', { children: 'Loading...' })
            : Object(a.jsxs)(ue.a, {
                maxwidth: 'md',
                children: [
                  Object(a.jsx)($.a, {
                    variant: 'h4',
                    align: 'center',
                    children: 'Student Management'
                  }),
                  Object(a.jsx)(Je, {
                    label: 'Search',
                    onChange: function (e) {
                      if ('' === e.target.value) return u(r)
                      var t = r.filter(function (t) {
                        return !t.email.indexOf(e.target.value.trim())
                      })
                      u(t)
                    }
                  }),
                  Object(a.jsx)(rn, {
                    values: d,
                    remove: function (e) {
                      console.log('removing student w/ id', e),
                        v(e),
                        q
                          .post('/student/delete', { studentId: e })
                          .then(function (e) {
                            console.log(e),
                              C({
                                message: 'Student sucessfully removed',
                                severity: 'success'
                              }),
                              k(!0),
                              A()
                          })
                          .catch(function (e) {
                            switch ((console.log(e), e)) {
                              case 'error_retrieving_student':
                                C({
                                  message:
                                    'An error occurred while retrieving the student. Please try again',
                                  severity: 'warning'
                                })
                                break
                              case 'student_not_found':
                                C({
                                  message:
                                    'Could not find the requested student',
                                  severity: 'warning'
                                }),
                                  A()
                                break
                              default:
                                C({
                                  message:
                                    'An error occurred, please try again',
                                  severity: 'error'
                                })
                            }
                            k(!0)
                          })
                          .finally(function () {
                            v(null)
                          })
                    },
                    removing: f
                  }),
                  Object(a.jsx)(xt, {
                    open: w,
                    setOpen: k,
                    message: S.message,
                    severity: S.severity
                  }),
                  Object(a.jsx)(i.b, {
                    to: '/student/assign',
                    children: Object(a.jsx)(ke, { children: 'Assign Students' })
                  })
                ]
              })
        },
        cn = function (e) {
          var t = Object(s.useState)(''),
            n = Object(p.a)(t, 2),
            r = n[0],
            o = n[1],
            c = Object(s.useState)([]),
            i = Object(p.a)(c, 2),
            l = i[0],
            b = i[1],
            h = Object(s.useState)(!0),
            O = Object(p.a)(h, 2),
            g = O[0],
            x = O[1],
            f = Object(s.useState)({}),
            v = Object(p.a)(f, 2),
            m = v[0],
            y = v[1],
            S = Object(s.useState)(!1),
            C = Object(p.a)(S, 2),
            P = C[0],
            T = C[1],
            w = Object(s.useState)(!1),
            k = Object(p.a)(w, 2),
            A = k[0],
            N = k[1],
            _ = (function () {
              var e = Object(j.a)(
                d.a.mark(function e(t) {
                  var n
                  return d.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          if (0 !== l.length) {
                            e.next = 2
                            break
                          }
                          return e.abrupt(
                            'return',
                            console.log(
                              'Please enter some supervisor emails before uploading'
                            )
                          )
                        case 2:
                          ;(n = { supervisors: l }),
                            console.log('Uploading: ', n),
                            N(!0),
                            q
                              .post('/supervisor/assign', n)
                              .then(function (e) {
                                if (
                                  (console.log(e.data.supervisors),
                                  e.data.supervisors.length > 0)
                                ) {
                                  var t,
                                    n = Object(lt.a)(l),
                                    a = l.map(function (e) {
                                      return e.email
                                    }),
                                    s = Object(u.a)(e.data.supervisors)
                                  try {
                                    for (s.s(); !(t = s.n()).done; ) {
                                      var r = t.value,
                                        o = a.indexOf(r.email)
                                      o < 0 || (n[o].status = r.status)
                                    }
                                  } catch (i) {
                                    s.e(i)
                                  } finally {
                                    s.f()
                                  }
                                  var c = n.filter(function (e) {
                                    return ![
                                      'assigned',
                                      'exists',
                                      void 0
                                    ].includes(
                                      null === e || void 0 === e
                                        ? void 0
                                        : e.status
                                    )
                                  })
                                  return (
                                    console.log(c),
                                    c.length > 0
                                      ? (y({
                                          message:
                                            'Could not add the following supervisor emails',
                                          severity: 'error'
                                        }),
                                        T(!0))
                                      : (y({
                                          message:
                                            'Supervisors were added successfully',
                                          severity: 'success'
                                        }),
                                        T(!0)),
                                    b(c)
                                  )
                                }
                                b([]),
                                  y({
                                    message:
                                      'All supervisors were sucessfully added',
                                    severity: 'success'
                                  }),
                                  T(!0)
                              })
                              .catch(function (e) {
                                console.log(e),
                                  y({
                                    message:
                                      'An error occurred, please try again',
                                    severity: 'error'
                                  }),
                                  T(!0)
                              })
                              .finally(function () {
                                N(!1)
                              })
                        case 6:
                        case 'end':
                          return e.stop()
                      }
                  }, e)
                })
              )
              return function (t) {
                return e.apply(this, arguments)
              }
            })(),
            E = g
              ? Object(a.jsx)('span', {
                  style: { fontSize: '10px', color: 'gray', marginRight: 10 },
                  children: '@ul.ie'
                })
              : ''
          return Object(a.jsxs)(ue.a, {
            maxWidth: 'lg',
            children: [
              Object(a.jsx)(en, {}),
              Object(a.jsx)($.a, {
                variant: 'h6',
                children: 'Add Supervisors (CSV File)'
              }),
              Object(a.jsx)(At, {
                onAdd: function (e) {
                  var t,
                    n = Object(lt.a)(l),
                    a = Object(u.a)(e)
                  try {
                    for (a.s(); !(t = a.n()).done; ) {
                      var s = t.value
                      if (!s || 0 === s.length) return
                      n.push({ id: n.length, email: s })
                    }
                  } catch (r) {
                    a.e(r)
                  } finally {
                    a.f()
                  }
                  b(n)
                }
              }),
              Object(a.jsx)('br', {}),
              Object(a.jsx)(_e.a, {}),
              Object(a.jsx)('br', {}),
              Object(a.jsx)($.a, {
                variant: 'h6',
                children: 'Add Supervisor by Email'
              }),
              Object(a.jsx)(Dt, {
                email: r,
                endAdornment: E,
                onChange: function (e) {
                  o(e.target.value)
                },
                includeEmailPrefix: g,
                onChangeEmailPrefix: function (e) {
                  x(e.target.checked)
                },
                onAdd: function (e) {
                  if (0 === r.length)
                    return (
                      y({
                        message: 'Cannot add empty email!',
                        severity: 'warning'
                      }),
                      void T(!0)
                    )
                  if (
                    l.filter(function (e) {
                      return e.email === r
                    }).length > 0
                  )
                    return (
                      y({
                        message: 'Cannot add duplicate email!',
                        severity: 'warning'
                      }),
                      void T(!0)
                    )
                  var t = -1 === r.indexOf('@') && g ? '@ul.ie' : '',
                    n = r.trim() + t
                  if (!/\S+@\S+\.\S+/.test(n))
                    return (
                      y({
                        message: 'Cannot add invalid email!',
                        severity: 'error'
                      }),
                      void T(!0)
                    )
                  var a = Object(lt.a)(l)
                  a.push({ email: n }), o(''), b(a)
                }
              }),
              Object(a.jsx)('br', {}),
              Object(a.jsx)(xt, {
                open: P,
                setOpen: T,
                message: m.message,
                severity: m.severity
              }),
              Object(a.jsx)('br', {}),
              Object(a.jsx)(Yt, {
                value: l,
                removableEntries: !0,
                removeEntry: function (e) {
                  var t = l.filter(function (t) {
                    return t.email !== e
                  })
                  b(t)
                }
              }),
              Object(a.jsx)(Pt, {
                disabled: !l.length,
                loading: A,
                onUpload: _
              }),
              Object(a.jsx)(ke, {
                type: 'button',
                color: 'secondary',
                onClick: function () {
                  b([])
                },
                children: 'Clear Supervisor List'
              })
            ]
          })
        },
        ln = function (e) {
          var t = Object(s.useState)([]),
            n = Object(p.a)(t, 2),
            r = n[0],
            o = n[1],
            c = Object(s.useState)([]),
            l = Object(p.a)(c, 2),
            d = l[0],
            u = l[1],
            j = Object(s.useState)(!0),
            b = Object(p.a)(j, 2),
            h = b[0],
            O = b[1],
            g = Object(s.useState)(''),
            x = Object(p.a)(g, 2),
            f = x[0],
            v = x[1],
            m = Object(s.useState)({
              message: 'No Message Supplied',
              severity: 'info'
            }),
            y = Object(p.a)(m, 2),
            S = y[0],
            C = y[1],
            P = Object(s.useState)(!1),
            T = Object(p.a)(P, 2),
            w = T[0],
            k = T[1]
          Object(s.useEffect)(function () {
            A()
          }, [])
          var A = function () {
            q.get('/supervisor')
              .then(function (e) {
                console.log(e), o(e.data.supervisors), u(e.data.supervisors)
              })
              .catch(function (e) {
                console.log(e)
              })
              .finally(function () {
                O(!1)
              })
          }
          return h
            ? Object(a.jsx)('p', { children: 'Loading...' })
            : Object(a.jsxs)(ue.a, {
                maxwidth: 'md',
                children: [
                  Object(a.jsx)($.a, {
                    variant: 'h4',
                    align: 'center',
                    children: 'Supervisor Management'
                  }),
                  Object(a.jsx)(Je, {
                    label: 'Search',
                    onChange: function (e) {
                      if ('' === e.target.value) return u(r)
                      var t = r.filter(function (t) {
                        return !t.email.indexOf(
                          e.target.value.trim().toLowerCase()
                        )
                      })
                      u(t)
                    }
                  }),
                  Object(a.jsx)(rn, {
                    values: d,
                    remove: function (e) {
                      console.log('removing supervisor w/ id', e),
                        v(e),
                        q
                          .post('/supervisor/delete', { supervisorId: e })
                          .then(function (e) {
                            console.log(e), A()
                          })
                          .catch(function (e) {
                            console.log(e),
                              C({
                                message: 'Could not remove Supervisor',
                                severity: 'error'
                              }),
                              k(!0)
                          })
                          .finally(function () {
                            v(null)
                          })
                    },
                    removing: f
                  }),
                  Object(a.jsx)(xt, {
                    open: w,
                    setOpen: k,
                    message: S.message,
                    severity: S.severity
                  }),
                  Object(a.jsx)(i.b, {
                    to: '/supervisor/assign',
                    children: Object(a.jsx)(ke, {
                      children: 'Go to Assign Supervisors Page'
                    })
                  })
                ]
              })
        },
        dn = { coordinator: '' },
        un = Ie.b().shape({
          coordinator: Ie.c()
            .email('Must be a valid email')
            .required('Email address must not be blank')
        }),
        jn = n(483),
        bn = n(484),
        pn = function (e) {
          return Object(a.jsxs)(a.Fragment, {
            children: [
              Object(a.jsx)(pe.a, {
                component: je.a,
                children: Object(a.jsxs)(he.a, {
                  'aria-label': 'simple table',
                  children: [
                    Object(a.jsx)(Oe.a, {
                      children: Object(a.jsxs)(ge.a, {
                        children: [
                          Object(a.jsx)(xe.a, { children: 'Name' }),
                          Object(a.jsx)(xe.a, {
                            align: 'right',
                            children: 'Email'
                          }),
                          Object(a.jsx)(xe.a, {
                            align: 'right',
                            children: 'Actions'
                          })
                        ]
                      })
                    }),
                    Object(a.jsx)(fe.a, {
                      children: e.refreshing
                        ? Object(a.jsx)(ge.a, {
                            children: Object(a.jsx)(xe.a, {
                              component: 'th',
                              scope: 'row',
                              colSpan: 3,
                              children: 'Refreshing Coordinator List ...'
                            })
                          })
                        : 0 === e.value.length
                        ? Object(a.jsx)(ge.a, {
                            children: Object(a.jsx)(xe.a, {
                              component: 'th',
                              scope: 'row',
                              colSpan: 3,
                              children: 'No Coordinators Found'
                            })
                          })
                        : e.value.map(function (t) {
                            return Object(a.jsxs)(
                              ge.a,
                              {
                                children: [
                                  Object(a.jsx)(xe.a, {
                                    component: 'th',
                                    scope: 'row',
                                    children: t.displayName
                                  }),
                                  Object(a.jsx)(xe.a, {
                                    align: 'right',
                                    children: t.email
                                  }),
                                  Object(a.jsx)(xe.a, {
                                    align: 'right',
                                    children: Object(a.jsx)(de.a, {
                                      variant: 'outlined',
                                      color: 'secondary',
                                      startIcon: Object(a.jsx)(zt.a, {}),
                                      onClick: function () {
                                        return e.handleRemove(t)
                                      },
                                      children: 'Remove'
                                    })
                                  })
                                ]
                              },
                              t.id
                            )
                          })
                    })
                  ]
                })
              }),
              Object(a.jsx)(xt, {
                open: e.open,
                setOpen: e.setOpen,
                message: e.alert.message,
                severity: e.alert.severity
              })
            ]
          })
        },
        hn = r.a.forwardRef(function (e, t) {
          return Object(a.jsx)(
            jn.a,
            Object(b.a)({ direction: 'up', ref: t }, e)
          )
        })
      function On(e) {
        var t,
          n = Object(s.useState)(),
          r = Object(p.a)(n, 2),
          o = r[0],
          c = r[1],
          i = Object(s.useState)([]),
          l = Object(p.a)(i, 2),
          d = l[0],
          u = l[1],
          j = Object(s.useState)(!1),
          b = Object(p.a)(j, 2),
          h = b[0],
          O = b[1],
          g = Object(s.useState)(!0),
          x = Object(p.a)(g, 2),
          f = x[0],
          v = x[1],
          m = Object(s.useState)({}),
          y = Object(p.a)(m, 2),
          S = y[0],
          C = y[1],
          P = Object(s.useState)(!1),
          T = Object(p.a)(P, 2),
          w = T[0],
          k = T[1],
          A = Object(s.useState)({}),
          N = Object(p.a)(A, 2),
          _ = N[0],
          E = N[1],
          R = Object(s.useState)(!1),
          M = Object(p.a)(R, 2),
          D = M[0],
          I = M[1],
          L = Object(Ae.c)({
            resolver: Object(De.yupResolver)(un),
            reValidateMode: 'onChange',
            defaultValues: dn
          }),
          W = L.register,
          F = L.handleSubmit,
          U = L.errors
        Object(s.useEffect)(function () {
          B()
        }, [])
        var B = function () {
            v(!0),
              q
                .get('/coordinator')
                .then(function (e) {
                  var t
                  if (
                    !(null === (t = e.data) || void 0 === t
                      ? void 0
                      : t.coordinators)
                  )
                    return u([])
                  u(e.data.coordinators)
                })
                .catch(function (e) {
                  console.log(e),
                    E({ message: e.message, severity: 'error' }),
                    I(!0),
                    v(!1)
                })
                .finally(function () {
                  v(!1)
                })
          },
          z = function (e) {
            e
              ? (q
                  .post('/coordinator/remove', { coordinatorId: o._id })
                  .then(function (e) {
                    console.log(e),
                      E({
                        message: 'Coordinator sucessfully removed',
                        severity: 'success'
                      }),
                      I(!0),
                      B()
                  })
                  .catch(function (e) {
                    switch (e) {
                      case 'error_while_retrieving_coordinator':
                        E({
                          message:
                            'An error occurred while retrieving the selected coordinator, please try again',
                          severity: 'warning'
                        })
                        break
                      case 'unable_to_remove':
                        E({
                          message:
                            'Could not remove coordinator, please try again',
                          severity: 'warning'
                        })
                        break
                      case 'coordinator_not_found':
                        E({
                          message: 'Could not find selected coordinator',
                          severity: 'warning'
                        }),
                          B()
                        break
                      default:
                        console.log(e),
                          E({
                            message: 'Could not remove coordinator',
                            severity: 'error'
                          })
                    }
                    I(!0)
                  }),
                O(!1))
              : O(!1)
          }
        return Object(a.jsxs)(ue.a, {
          maxWidth: 'md',
          children: [
            Object(a.jsxs)(ae.a, {
              open: h,
              TransitionComponent: hn,
              'aria-labelledby': 'alert-dialog-slide-title',
              'aria-describedby': 'alert-dialog-slide-description',
              children: [
                Object(a.jsx)(se.a, {
                  id: 'alert-dialog-slide-title',
                  children: 'Remove Coordinator?'
                }),
                Object(a.jsx)(re.a, {
                  children: Object(a.jsxs)(oe.a, {
                    id: 'alert-dialog-slide-description',
                    children: [
                      'Are you sure you want to remove',
                      Object(a.jsx)('br', {}),
                      Object(a.jsx)('span', {
                        style: { fontWeight: 'bold' },
                        children:
                          null === o || void 0 === o ? void 0 : o.displayName
                      }),
                      Object(a.jsx)('br', {}),
                      'Coordinator role?'
                    ]
                  })
                }),
                Object(a.jsxs)(le.a, {
                  children: [
                    Object(a.jsx)(de.a, {
                      variant: 'outlined',
                      onClick: function () {
                        return z(!1)
                      },
                      color: 'primary',
                      children: 'No'
                    }),
                    Object(a.jsx)(de.a, {
                      startIcon: Object(a.jsx)(nn.a, {}),
                      variant: 'contained',
                      onClick: function () {
                        return z(!0)
                      },
                      color: 'secondary',
                      children: 'Yes'
                    })
                  ]
                })
              ]
            }),
            Object(a.jsx)($.a, {
              variant: 'h6',
              children: 'Manage Coordinators'
            }),
            Object(a.jsx)('br', {}),
            Object(a.jsxs)('form', {
              onSubmit: F(function (e) {
                q.post('/coordinator/assign', e)
                  .then(function (e) {
                    var t, n
                    switch (
                      null === (t = e.data) ||
                      void 0 === t ||
                      null === (n = t.coordinator[0]) ||
                      void 0 === n
                        ? void 0
                        : n.status
                    ) {
                      case 'assigned':
                        console.log('Sucessful Coordinator assign'),
                          C({
                            message: 'Coordinator suvessfully assigned',
                            severity: 'success'
                          }),
                          B()
                        break
                      case 'exists':
                        C({
                          message: 'User is already a Coordinator',
                          severity: 'warning'
                        })
                        break
                      case 'not_found':
                        C({
                          message:
                            'Email address supplied could not be linked to an active user',
                          severity: 'error'
                        })
                        break
                      default:
                        C({
                          message: 'An error occurred, please try again',
                          severity: 'error'
                        })
                    }
                    console.log(S), k(!0)
                  })
                  .catch(function (e) {
                    C({
                      message: 'An error occurred, please try again',
                      severity: 'warning'
                    }),
                      k(!0)
                  })
              }),
              children: [
                Object(a.jsx)(Je, {
                  inputRef: W,
                  label: 'Coordinator Email',
                  placeholder: 'e.g. John.Keane@ul.ie',
                  variant: 'outlined',
                  name: 'coordinator',
                  style: { margin: 0 },
                  error: !!U.coordinator,
                  helperText:
                    null === U ||
                    void 0 === U ||
                    null === (t = U.coordinator) ||
                    void 0 === t
                      ? void 0
                      : t.message
                }),
                Object(a.jsx)(ke, {
                  variant: 'contained',
                  color: 'primary',
                  endIcon: Object(a.jsx)(bn.a, {}),
                  children: 'Assign New Coordinator'
                }),
                Object(a.jsx)(xt, {
                  open: w,
                  setOpen: k,
                  message: S.message,
                  severity: S.severity
                })
              ]
            }),
            Object(a.jsx)($.a, {
              variant: 'h6',
              children: 'Existing Coordinators'
            }),
            Object(a.jsx)('br', {}),
            Object(a.jsx)(pn, {
              refreshing: f,
              value: d,
              open: D,
              setOpen: I,
              handleRemove: function (e) {
                c(e), O(!0)
              },
              alert: _
            })
          ]
        })
      }
      var gn = n(487),
        xn = n(505),
        fn = n(253),
        vn = n(245),
        mn = n.n(vn),
        yn = n(246),
        Sn = n.n(yn),
        Cn = n(485),
        Pn = n(486),
        Tn = n(247),
        wn = n.n(Tn),
        kn = Object(Pe.a)(function (e) {
          return {
            navDisplayFlex: {
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center'
            },
            linkText: {
              textDecoration: 'none',
              textTransform: 'none',
              color: 'white'
            },
            linkButton: { margin: '0 5px' }
          }
        })
      function An(e) {
        var t = kn(),
          n = Object(s.useContext)(T).currentPhase,
          r = (Object(h.f)(), Object(O.d)()),
          o = r.instance,
          c = r.accounts[0].name.split(' ').map(function (e) {
            return e[0]
          }),
          l = Object(s.useState)(null),
          d = Object(p.a)(l, 2),
          u = d[0],
          j = d[1]
        return Object(a.jsxs)(K.a, {
          children: [
            Object(a.jsxs)('div', {
              style: { flexGrow: 1 },
              children: [
                Object(a.jsx)(i.b, {
                  to: '/',
                  children: Object(a.jsx)(Ne.a, {
                    edge: 'start',
                    'aria-label': 'home',
                    children: Object(a.jsx)(mn.a, {
                      fontSize: 'large',
                      style: { color: 'white' }
                    })
                  })
                }),
                3 === n.phase || 4 === n.phase
                  ? Object(a.jsxs)(a.Fragment, {
                      children: [
                        Object(a.jsx)(N, {
                          I: 'read',
                          a: 'Topic',
                          children: Object(a.jsx)(i.b, {
                            to: '/topics',
                            className: t.linkButton,
                            children: Object(a.jsx)(de.a, {
                              className: t.linkText,
                              children: 'View Topics List'
                            })
                          })
                        }),
                        Object(a.jsx)(N, {
                          I: 'manage',
                          a: 'Proposal',
                          children: Object(a.jsx)(i.b, {
                            to: '/proposals',
                            className: t.linkButton,
                            children: Object(a.jsx)(de.a, {
                              className: t.linkText,
                              children: 'My Proposals'
                            })
                          })
                        })
                      ]
                    })
                  : null,
                (2 === n.phase || 3 === n.phase || 4 === n.phase) &&
                  Object(a.jsx)(N, {
                    I: 'manage',
                    a: 'Topic',
                    children: Object(a.jsx)(i.b, {
                      to: '/topics/manage',
                      className: t.linkButton,
                      children: Object(a.jsx)(de.a, {
                        className: t.linkText,
                        children: 'My Topics'
                      })
                    })
                  }),
                Object(a.jsx)(N, {
                  I: 'manage',
                  a: 'Student',
                  children: Object(a.jsx)(i.b, {
                    to: '/student/manage',
                    className: t.linkButton,
                    children: Object(a.jsx)(de.a, {
                      className: t.linkText,
                      children: 'Manage Students'
                    })
                  })
                }),
                Object(a.jsx)(N, {
                  I: 'manage',
                  a: 'Supervisor',
                  children: Object(a.jsx)(i.b, {
                    to: '/supervisor/manage',
                    className: t.linkButton,
                    children: Object(a.jsx)(de.a, {
                      className: t.linkText,
                      children: 'Manage Supervisors'
                    })
                  })
                }),
                Object(a.jsx)(N, {
                  I: 'takeActionPhaseOne',
                  this: n,
                  children: Object(a.jsx)(N, {
                    I: 'create',
                    a: 'Coordinator',
                    children: Object(a.jsx)(i.b, {
                      to: '/coordinator',
                      className: t.linkButton,
                      children: Object(a.jsx)(de.a, {
                        className: t.linkText,
                        children: 'Manage Coordinators'
                      })
                    })
                  })
                }),
                Object(a.jsx)(N, {
                  I: 'update',
                  a: 'Phase',
                  children: Object(a.jsx)(i.b, {
                    to: '/phase/manage',
                    className: t.linkButton,
                    children: Object(a.jsx)(de.a, {
                      className: t.linkText,
                      children: 'Manage Phases'
                    })
                  })
                })
              ]
            }),
            Object(a.jsxs)(dt.a, {
              edge: 'end',
              children: [
                Object(a.jsx)(de.a, {
                  'aria-label': 'delete',
                  onClick: function (e) {
                    j(e.currentTarget)
                  },
                  endIcon: Object(a.jsx)(Sn.a, { style: { color: 'white' } }),
                  children: Object(a.jsx)(xn.a, {
                    style: { color: 'white' },
                    children: c
                  })
                }),
                Object(a.jsx)(fn.a, {
                  anchorEl: u,
                  keepMounted: !0,
                  open: Boolean(u),
                  onClose: function () {
                    j(null)
                  },
                  getContentAnchorEl: null,
                  anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
                  transformOrigin: { vertical: 'top', horizontal: 'center' },
                  children: Object(a.jsxs)(ze.a, {
                    onClick: function () {
                      o.logout({
                        onRedirectNavigate:
                          'https://fyp-assistance-spa.herokuapp.com/'
                      }),
                        j(null)
                    },
                    children: [
                      Object(a.jsx)(Cn.a, {
                        children: Object(a.jsx)(wn.a, { fontSize: 'small' })
                      }),
                      Object(a.jsx)(Pn.a, { primary: 'Logout' })
                    ]
                  })
                })
              ]
            })
          ]
        })
      }
      var Nn = Object(Pe.a)(function (e) {
        return { appBar: { zIndex: e.zIndex.drawer + 1 } }
      })
      function _n(e) {
        var t = Nn()
        return Object(a.jsx)(gn.a, {
          position: 'fixed',
          className: t.appBar,
          children: Object(a.jsx)(An, {})
        })
      }
      var En = n(248),
        Rn = n.n(En),
        Mn = {
          draft: 'Draft',
          submitted: 'Pending Supervisor Feedback',
          under_review: 'Under Review',
          pending_edits: 'Edits Required',
          accepted: 'Accepted',
          rejected: 'Rejected'
        },
        Dn = function (e) {
          return Mn[e]
        },
        In = n(185),
        Ln = {
          title: Ie.c().required('Proposal must have a title'),
          description: Ie.c().required('Proposal must have a description'),
          chooseMeMessage: Ie.c(),
          additionalNotes: Ie.c(),
          environment: Ie.c(),
          languages: Ie.c()
        },
        Wn =
          (Ie.b().shape(Object(b.a)({}, Ln)),
          Ie.b().shape({
            description: Ie.c().required('Proposal must have a description'),
            chooseMeMessage: Ie.c(),
            additionalNotes: Ie.c(),
            environment: Ie.c(),
            languages: Ie.c()
          })),
        Fn = Object(Pe.a)(function (e) {
          return {
            formControl: { minWidth: 300, flex: 1 },
            selectEmpty: { marginTop: e.spacing(2) },
            readOnlySelect: {
              width: 300,
              '&.Mui-disabled option': { color: 'black' }
            },
            buttonProgress: {
              color: Me.a[500],
              position: 'absolute',
              left: '50%'
            }
          }
        }),
        Un = function (e) {
          Fn()
          var t,
            n,
            r,
            o,
            c,
            i,
            l,
            d,
            u = {
              title: (d = e.proposal).title,
              description: d.description,
              chooseMessage: d.chooseMessage || '',
              additionalNotes: d.additionalNotes || '',
              environment: d.environment,
              languages: d.languages,
              type: d.type
            },
            j = Object(s.useState)(!1),
            b = Object(p.a)(j, 2),
            h = b[0],
            O = b[1],
            g = Object(s.useState)(!1),
            x = Object(p.a)(g, 2),
            f = x[0],
            v = x[1],
            m =
              (Object(s.useContext)(T).currentPhase,
              Object(Ae.c)({
                resolver: Object(De.yupResolver)(Wn),
                reValidateMode: 'onChange',
                defaultValues: u
              })),
            y = m.register,
            S = m.handleSubmit,
            C = m.errors,
            P =
              (m.control,
              function () {
                O(!h)
              })
          return Object(a.jsxs)(ae.a, {
            fullWidth: !0,
            maxWidth: 'lg',
            open: e.dialogOpen,
            onClose: function () {
              console.log('impement dialog close')
            },
            'aria-labelledby': 'max-width-dialog-title',
            style: { zIndex: '900 !important' },
            disableBackdropClick: !0,
            children: [
              Object(a.jsxs)(se.a, {
                id: 'max-width-dialog-title',
                children: [
                  ['draft', 'pending_edits'].includes(e.proposal.status)
                    ? Object(a.jsx)(Ne.a, {
                        onClick: P,
                        disabled: f,
                        children: Object(a.jsx)(Re.a, {})
                      })
                    : null,
                  Object(a.jsx)(Ne.a, {
                    edge: 'end',
                    onClick: function () {
                      e.setDialogOpen(!1)
                    },
                    disabled: f,
                    children: Object(a.jsx)(Ee.a, {})
                  }),
                  Object(a.jsx)(_e.a, {})
                ]
              }),
              Object(a.jsxs)(re.a, {
                children: [
                  Object(a.jsx)(Je, {
                    inputRef: y,
                    name: 'title',
                    label: 'Title',
                    variant: 'outlined',
                    margin: 'none',
                    readOnly: !h,
                    error: !!C.description,
                    helperText:
                      null === C ||
                      void 0 === C ||
                      null === (t = C.description) ||
                      void 0 === t
                        ? void 0
                        : t.message
                  }),
                  Object(a.jsxs)('form', {
                    onSubmit: S(function (t) {
                      console.log('Submitting', t)
                      var n = (function (t) {
                        var n = In.reduce(
                          t,
                          function (t, n, a) {
                            return In.isEqual(n, e.proposal[a]) || (t[a] = n), t
                          },
                          {}
                        )
                        return Object.keys(n).length > 0 ? n : null
                      })(t)
                      console.log('Differences', n),
                        n
                          ? q
                              .post('/proposal/edit/'.concat(e.proposal._id), n)
                              .then(function (t) {
                                console.log(t), e.refresh()
                              })
                              .catch(function (e) {
                                console.log(e)
                              })
                              .finally(function () {
                                v(!1), P()
                              })
                          : P()
                    }),
                    children: [
                      Object(a.jsx)(Ge, {
                        inputRef: y,
                        name: 'description',
                        label: 'Description',
                        readOnly: !h,
                        error: !!C.description,
                        helperText:
                          null === C ||
                          void 0 === C ||
                          null === (n = C.description) ||
                          void 0 === n
                            ? void 0
                            : n.message
                      }),
                      Object(a.jsx)(Ge, {
                        inputRef: y,
                        label: 'Choose Me Message',
                        placeholder: '<No Choose Message Supplied>',
                        name: 'chooseMessage',
                        readOnly: !h,
                        error: !!C.chooseMessage,
                        helperText:
                          null === C ||
                          void 0 === C ||
                          null === (r = C.chooseMessage) ||
                          void 0 === r
                            ? void 0
                            : r.message
                      }),
                      Object(a.jsx)(Ge, {
                        inputRef: y,
                        label: 'Additional Notes',
                        placeholder: '<No Additional Notes Supplied>',
                        name: 'additionalNotes',
                        readOnly: !h,
                        error: !!C.additionalNotes,
                        helperText:
                          null === C ||
                          void 0 === C ||
                          null === (o = C.additionalNotes) ||
                          void 0 === o
                            ? void 0
                            : o.message
                      }),
                      'studentDefined' === u.type
                        ? Object(a.jsxs)(a.Fragment, {
                            children: [
                              Object(a.jsx)(Ge, {
                                inputRef: y,
                                label: 'Environment',
                                name: 'environment',
                                readOnly: !h,
                                error: !!C.environment,
                                helperText:
                                  null === C ||
                                  void 0 === C ||
                                  null === (c = C.environment) ||
                                  void 0 === c
                                    ? void 0
                                    : c.message
                              }),
                              Object(a.jsx)(Ge, {
                                inputRef: y,
                                label: 'Languages',
                                name: 'languages',
                                readOnly: !h,
                                error: !!C.languages,
                                helperText:
                                  null === C ||
                                  void 0 === C ||
                                  null === (i = C.languages) ||
                                  void 0 === i
                                    ? void 0
                                    : i.message
                              })
                            ]
                          })
                        : null,
                      '' !==
                      (null === (l = e.proposal) || void 0 === l
                        ? void 0
                        : l.supervisorMessage)
                        ? Object(a.jsxs)(a.Fragment, {
                            children: [
                              Object(a.jsx)(_e.a, {}),
                              Object(a.jsx)($.a, {
                                variant: 'h6',
                                children: 'Supervisor Feedback'
                              }),
                              Object(a.jsx)(Ge, {
                                label: 'Supervisor Notes',
                                value: e.proposal.supervisorMessage,
                                readOnly: !0
                              })
                            ]
                          })
                        : null,
                      h &&
                        Object(a.jsx)(ke, {
                          loading: f,
                          children: 'Save Changes'
                        })
                    ]
                  })
                ]
              })
            ]
          })
        }
      Un.defaultProps = {
        proposal: {},
        setDialogOpen: function () {},
        dialogOpen: !0,
        refresh: function () {}
      }
      var Bn = Un,
        qn = function (e) {
          switch (e.status) {
            case 'draft':
              return Object(a.jsx)(de.a, {
                onClick: function () {
                  return e.updateStatus(e.proposalId)
                },
                children: 'Submit Proposal'
              })
            case 'pending_edits':
              return Object(a.jsx)(de.a, {
                onClick: function () {
                  return e.updateStatus(e.proposalId)
                },
                children: 'Submit Updated Proposal'
              })
            case 'submitted':
              return Object(a.jsx)(N, {
                I: 'takeActionPhaseThree',
                this: e.currentPhase,
                children: Object(a.jsx)(de.a, {
                  variant: 'outlined',
                  color: 'secondary',
                  startIcon: Object(a.jsx)(Rn.a, {}),
                  onClick: function () {
                    return e.downgradeStatus(e.proposalId)
                  },
                  children: 'Convert to Draft'
                })
              })
            default:
              return null
          }
        },
        zn = function (e) {
          var t = Object(h.f)()
          return Object(a.jsx)(pe.a, {
            component: je.a,
            children: Object(a.jsxs)(he.a, {
              'aria-label': 'simple table',
              children: [
                Object(a.jsx)(Oe.a, {
                  children: Object(a.jsxs)(ge.a, {
                    children: [
                      Object(a.jsx)(xe.a, { children: 'Title' }),
                      Object(a.jsx)(xe.a, { children: 'For Topic' }),
                      Object(a.jsx)(xe.a, { children: 'Status' }),
                      Object(a.jsx)(xe.a, {
                        align: 'right',
                        children: 'Actions'
                      })
                    ]
                  })
                }),
                Object(a.jsx)(fe.a, {
                  children: e.loading
                    ? Object(a.jsx)(
                        ge.a,
                        {
                          children: Object(a.jsx)(xe.a, {
                            colSpan: 4,
                            children: 'Loading Values ...'
                          })
                        },
                        'loading_supervisor_proposals'
                      )
                    : 0 === e.values.length
                    ? Object(a.jsx)(
                        ge.a,
                        {
                          children: Object(a.jsx)(xe.a, {
                            colSpan: 4,
                            children: 'No Proposals to show'
                          })
                        },
                        'no_supervisor_proposals'
                      )
                    : e.values.map(function (n) {
                        return Object(a.jsxs)(
                          ge.a,
                          {
                            children: [
                              Object(a.jsx)(xe.a, {
                                children: Object(a.jsx)(ve.a, {
                                  onClick: function () {
                                    e.setSelectedProposal(n),
                                      e.setDialogOpen(!0)
                                  },
                                  children: n.title
                                })
                              }),
                              Object(a.jsx)(xe.a, {
                                children: Object(a.jsx)(ve.a, {
                                  onClick: function () {
                                    return t.push(
                                      '/topics/view/'.concat(n.topic._id)
                                    )
                                  },
                                  children: n.topic.title
                                })
                              }),
                              Object(a.jsx)(xe.a, { children: Dn(n.status) }),
                              Object(a.jsx)(xe.a, {
                                align: 'right',
                                children: Object(a.jsx)(qn, {
                                  status: n.status,
                                  proposalId: n._id,
                                  updateStatus: e.updateStatus,
                                  downgradeStatus: e.downgradeStatus,
                                  currentPhase: e.currentPhase
                                })
                              })
                            ]
                          },
                          n.id
                        )
                      })
                })
              ]
            })
          })
        },
        Vn = function (e) {
          var t = Object(s.useState)([]),
            n = Object(p.a)(t, 2),
            r = n[0],
            o = n[1],
            c = Object(s.useState)([]),
            i = Object(p.a)(c, 2),
            l = i[0],
            d = i[1],
            u = Object(s.useState)(),
            j = Object(p.a)(u, 2),
            b = j[0],
            h = j[1],
            O = Object(s.useState)(!0),
            g = Object(p.a)(O, 2),
            x = g[0],
            f = g[1],
            v = Object(s.useState)(!1),
            m = Object(p.a)(v, 2),
            y = m[0],
            S = m[1],
            C = Object(s.useContext)(T).currentPhase
          Object(s.useEffect)(function () {
            P()
          }, [])
          var P = function () {
              q.get('/proposal/me')
                .then(function (e) {
                  console.log(e)
                  var t = e.data.proposals.filter(function (e) {
                      return 'supervisorDefined' === e.type
                    }),
                    n = e.data.proposals.filter(function (e) {
                      return 'studentDefined' === e.type
                    })
                  console.log(t), console.log(n), o(t), d(n)
                })
                .catch(function (e) {
                  console.log(e)
                })
                .finally(function () {
                  f(!1)
                })
            },
            w = function (e) {
              q.post('/proposal/'.concat(e, '/upgrade'))
                .then(function (e) {
                  console.log(e), P()
                })
                .catch(function (e) {
                  console.log(e)
                })
            },
            k = function (e) {
              q.post('/proposal/'.concat(e, '/downgrade'))
                .then(function (e) {
                  console.log(e), P()
                })
                .catch(function (e) {
                  console.log(e)
                })
            }
          return Object(a.jsxs)(a.Fragment, {
            children: [
              b
                ? Object(a.jsx)(
                    Bn,
                    {
                      dialogOpen: y,
                      setDialogOpen: function (e) {
                        e || h(null), S(e)
                      },
                      proposal: b,
                      refresh: P
                    },
                    b._id
                  )
                : null,
              Object(a.jsxs)(ue.a, {
                maxWidth: 'lg',
                children: [
                  Object(a.jsx)($.a, {
                    variant: 'h4',
                    align: 'center',
                    children: 'Proposal Management'
                  }),
                  4 !== C.phase
                    ? Object(a.jsx)($.a, {
                        align: 'center',
                        children:
                          'Supervisors will be available to respond to Proposals during Phase 4'
                      })
                    : null,
                  Object(a.jsx)($.a, {
                    children: 'Supervisor Topic Proposals'
                  }),
                  Object(a.jsx)(zn, {
                    loading: x,
                    values: r,
                    updateStatus: w,
                    downgradeStatus: k,
                    setSelectedProposal: h,
                    setDialogOpen: S,
                    currentPhase: C
                  }),
                  Object(a.jsx)($.a, { children: 'Custom Proposals' }),
                  Object(a.jsx)(zn, {
                    loading: x,
                    values: l,
                    updateStatus: w,
                    downgradeStatus: k,
                    setSelectedProposal: h,
                    setDialogOpen: S,
                    currentPhase: C
                  })
                ]
              })
            ]
          })
        },
        Hn = Object(Pe.a)(function (e) {
          return { class1: { marginLeft: e.spacing(4) } }
        }),
        Gn = function (e) {
          var t = Object(h.g)().id,
            n = (Hn(), Object(s.useState)(!0)),
            r = Object(p.a)(n, 2),
            o = r[0],
            c = r[1],
            l = Object(s.useState)(null),
            d = Object(p.a)(l, 2),
            u = d[0],
            j = d[1],
            b = Object(s.useState)(!1),
            O = Object(p.a)(b, 2),
            g = O[0],
            x = O[1]
          return (
            Object(s.useEffect)(function () {
              q.get('/topic/'.concat(t))
                .then(function (e) {
                  e.data.topic ? (console.log(e), j(e.data.topic)) : x(!0)
                })
                .catch(function (e) {
                  console.log(e)
                })
                .finally(function () {
                  c(!1)
                })
            }, []),
            o
              ? Object(a.jsx)('h1', { children: 'loading ...' })
              : g
              ? Object(a.jsx)('h1', { children: 'Invalid Topic Code' })
              : Object(a.jsxs)(ue.a, {
                  maxWidth: 'md',
                  children: [
                    Object(a.jsx)(en, { dense: !0 }),
                    Object(a.jsx)(Je, {
                      label: 'Title',
                      value: u.title,
                      readOnly: !0
                    }),
                    Object(a.jsx)(Je, {
                      label: 'Supervisor',
                      value: u.supervisor.displayName,
                      readOnly: !0
                    }),
                    Object(a.jsx)('br', {}),
                    Object(a.jsx)(Ge, {
                      label: 'Description',
                      value: u.description,
                      readOnly: !0
                    }),
                    '' === u.additionalNotes
                      ? null
                      : Object(a.jsx)(Ge, {
                          label: 'Additional Notes',
                          value: u.additionalNotes,
                          readOnly: !0
                        }),
                    Object(a.jsx)('div', {
                      children: u.tags.map(function (e) {
                        return Object(a.jsx)(
                          dt.a,
                          {
                            style: {
                              display: 'inline-block',
                              backgroundColor: '#dbdbdb',
                              color: '#5b5b5b',
                              margin: '0 3px',
                              padding: '4px',
                              borderRadius: '3px'
                            },
                            children: e
                          },
                          e
                        )
                      })
                    }),
                    Object(a.jsx)(N, {
                      I: 'create',
                      a: 'Proposal',
                      children: (
                        null === u || void 0 === u ? void 0 : u.hasProposal
                      )
                        ? Object(a.jsx)($.a, {
                            style: { fontSize: '17px' },
                            align: 'center',
                            children: Object(a.jsx)(i.b, {
                              to: '/proposals',
                              children:
                                'You already created a Proposal for this topic'
                            })
                          })
                        : Object(a.jsx)(i.b, {
                            to: '/proposals/add/'.concat(u._id),
                            children: Object(a.jsx)(ke, {
                              type: 'button',
                              children:
                                'Look interesting? Draft Proposal for this Topic'
                            })
                          })
                    })
                  ]
                })
          )
        },
        Yn = function (e) {
          var t = X().contextData
          return Object(a.jsxs)('div', {
            children: [
              Object(a.jsx)(i.b, { to: '/proposals/add/', children: 'Step 1' }),
              (null === t || void 0 === t ? void 0 : t.isCustomProposal)
                ? Object(a.jsxs)(a.Fragment, {
                    children: [
                      '->',
                      Object(a.jsx)(i.b, {
                        to: '/proposals/add/step2',
                        disabled:
                          (null === t || void 0 === t ? void 0 : t.step) < 2,
                        children: 'Step 2'
                      })
                    ]
                  })
                : Object(a.jsx)(a.Fragment, {}),
              ' ',
              '->',
              Object(a.jsx)(i.b, {
                to: '/proposals/add/finish',
                disabled: (null === t || void 0 === t ? void 0 : t.step) < 3,
                children: 'Finish'
              })
            ]
          })
        },
        Jn = Ie.b().shape({
          title: Ie.c().required('Proposal must have a title'),
          description: Ie.c().required('Proposl must have a description'),
          additionalNotes: Ie.c(),
          chooseMeMessage: Ie.c()
        }),
        Kn = function (e) {
          var t,
            n,
            r,
            o,
            c = Object(s.useState)(!0),
            i = Object(p.a)(c, 2),
            l = i[0],
            d = i[1],
            u = Object(s.useState)(!1),
            j = Object(p.a)(u, 2),
            O = j[0],
            g = j[1],
            x = X(),
            f = x.setContextData,
            v = x.contextData,
            m = Object(h.g)().topicId,
            y = {
              title: (null === v || void 0 === v ? void 0 : v.title) || '',
              description:
                (null === v || void 0 === v ? void 0 : v.description) || '',
              additionalNotes:
                (null === v || void 0 === v ? void 0 : v.additionalNotes) || '',
              chooseMeMessage:
                (null === v || void 0 === v ? void 0 : v.chooseMeMessage) || ''
            },
            S = Object(Ae.c)({
              resolver: Object(De.yupResolver)(Jn),
              revalidate: 'onChange',
              defaultValues: y
            }),
            C = S.register,
            P = S.handleSubmit,
            T = S.errors,
            w = Object(h.f)()
          Object(s.useEffect)(function () {
            m && null === v.topic
              ? (console.log('Loading from topicId'),
                q
                  .get('/topic/' + m)
                  .then(function (e) {
                    console.log(e),
                      e.data.topic &&
                        (f({
                          isCustomProposal:
                            'studentTopic' === e.data.topic.type,
                          topic: e.data.topic,
                          step: 1
                        }),
                        g(!0))
                  })
                  .catch(function (e) {
                    console.log(e)
                  })
                  .finally(function () {
                    d(!1)
                  }))
              : d(!1)
          }, [])
          return l
            ? Object(a.jsx)('h1', { children: 'Loading...' })
            : O
            ? Object(a.jsxs)(ue.a, {
                component: 'main',
                maxWidth: 'md',
                children: [
                  Object(a.jsx)(Yn, {}),
                  Object(a.jsx)($.a, { children: 'Create Proposal - Step 1' }),
                  Object(a.jsxs)('form', {
                    autoComplete: 'off',
                    onSubmit: P(function (e) {
                      console.log(e)
                      var t = Object(b.a)(
                        Object(b.a)({}, v),
                        {},
                        {
                          title: e.title,
                          description: e.description,
                          additionalNotes: e.additionalNotes,
                          chooseMeMessage: e.chooseMeMessage
                        }
                      )
                      if (
                        (1 === (null === v || void 0 === v ? void 0 : v.step) &&
                          (t.step = 2),
                        f(t),
                        null === v || void 0 === v
                          ? void 0
                          : v.isCustomProposal)
                      )
                        return w.push('./step2')
                      w.push('./finish')
                    }),
                    children: [
                      Object(a.jsx)(Je, {
                        inputRef: C,
                        name: 'title',
                        label: 'Project Title',
                        error: !!T.title,
                        helperText:
                          null === T ||
                          void 0 === T ||
                          null === (t = T.title) ||
                          void 0 === t
                            ? void 0
                            : t.message
                      }),
                      Object(a.jsx)(Ge, {
                        inputRef: C,
                        name: 'description',
                        label: 'Project Description',
                        error: !!T.description,
                        helperText:
                          null === T ||
                          void 0 === T ||
                          null === (n = T.description) ||
                          void 0 === n
                            ? void 0
                            : n.message
                      }),
                      Object(a.jsx)(Ge, {
                        inputRef: C,
                        name: 'chooseMeMessage',
                        label: 'Why choose me for this topic? (Optional)',
                        placeholder:
                          'Why should the topic supervisor choose your project for this topic?',
                        error: !!T.chooseMeMessage,
                        helperText:
                          null === T ||
                          void 0 === T ||
                          null === (r = T.chooseMeMessage) ||
                          void 0 === r
                            ? void 0
                            : r.message
                      }),
                      Object(a.jsx)(Ge, {
                        inputRef: C,
                        name: 'additionalNotes',
                        label: 'Additional Notes (Optional)',
                        error: !!T.additionalNotes,
                        helperText:
                          null === T ||
                          void 0 === T ||
                          null === (o = T.additionalNotes) ||
                          void 0 === o
                            ? void 0
                            : o.message
                      }),
                      Object(a.jsx)(ke, { children: 'Save and Continue' })
                    ]
                  })
                ]
              })
            : Object(a.jsxs)(ue.a, {
                maxWidth: 'lg',
                children: [
                  Object(a.jsx)($.a, {
                    align: 'center',
                    children: 'Cannot create proposal without a selected topic'
                  }),
                  Object(a.jsx)(ke, {
                    type: 'button',
                    onClick: function () {
                      return w.push('/topics')
                    },
                    children: 'View Available Topics'
                  })
                ]
              })
        },
        Zn = Ie.b().shape({
          environment: Ie.c().required(),
          languages: Ie.c().required()
        }),
        Qn = { environment: '', languages: '' },
        Xn = function (e) {
          var t,
            n,
            r = X(),
            o = r.setContextData,
            c = r.contextData,
            i = Object(Ae.c)({
              resolver: Object(De.yupResolver)(Zn),
              reValidateMode: 'onChange',
              defaultValues: Qn
            }),
            l = i.register,
            d = i.handleSubmit,
            u = i.errors,
            j = Object(h.f)()
          Object(s.useEffect)(function () {
            c.topic || j.push('/proposals/add')
          }, [])
          return Object(a.jsxs)(ue.a, {
            component: 'main',
            maxWidth: 'md',
            children: [
              Object(a.jsx)(Yn, {}),
              Object(a.jsx)($.a, { children: 'Create Proposal - Step 2' }),
              Object(a.jsxs)('form', {
                autoComplete: 'off',
                onSubmit: d(function (e) {
                  var t = Object(b.a)(
                    Object(b.a)({}, c),
                    {},
                    { environment: e.environment, languages: e.languages }
                  )
                  2 === (null === c || void 0 === c ? void 0 : c.step) &&
                    (t.step = 3),
                    j.push('./finish'),
                    o(t)
                }),
                children: [
                  Object(a.jsx)(Ge, {
                    inputRef: l,
                    name: 'environment',
                    label: 'Environment Required',
                    error: !!u.environment,
                    helperText:
                      null === u ||
                      void 0 === u ||
                      null === (t = u.environment) ||
                      void 0 === t
                        ? void 0
                        : t.message
                  }),
                  Object(a.jsx)(Ge, {
                    inputRef: l,
                    name: 'languages',
                    label: 'Languages / Technologies Required',
                    error: !!u.languages,
                    helperText:
                      null === u ||
                      void 0 === u ||
                      null === (n = u.languages) ||
                      void 0 === n
                        ? void 0
                        : n.message
                  }),
                  Object(a.jsx)(ke, { children: 'Save and Continue' })
                ]
              })
            ]
          })
        },
        $n = n(162),
        ea = n.n($n),
        ta = function (e) {
          var t,
            n,
            r,
            o = X(),
            c = o.setContextData,
            i = o.contextData,
            l = Object(s.useContext)(T).currentPhase,
            d = Object(s.useState)(!1),
            u = Object(p.a)(d, 2),
            j = u[0],
            O = u[1],
            g = Object(h.f)()
          Object(s.useEffect)(function () {
            console.log('useEffect', i.topic),
              i.topic || g.push('/proposals/add')
          }, [])
          var x = function (e) {
            var t = {
              isCustomProposal: i.isCustomProposal,
              title: i.title,
              description: i.description,
              additionalNotes: i.additionalNotes,
              chooseMessage: i.chooseMeMessage,
              topic: i.topic._id,
              saveAsDraft: !e
            }
            if (i.isCustomProposal) {
              var n = Object(b.a)({}, t)
              t = Object(b.a)(
                Object(b.a)({}, n),
                {},
                { environment: i.environment, languages: i.languages }
              )
            }
            console.log('Submitting ', t),
              O(!0),
              q
                .post('/proposal/add', t)
                .then(function (e) {
                  console.log(e), c({}), g.push('/proposals')
                })
                .catch(function (e) {
                  if (e.response)
                    switch (e.response.data) {
                      case 'existing_topic_proposal':
                        alert(
                          'Cannot create multiple proposals for a single topic'
                        )
                    }
                  else
                    e.request
                      ? console.log(e.request)
                      : console.log('Error', e.message)
                })
                .finally(function () {
                  O(!1)
                })
          }
          return Object(a.jsxs)(ue.a, {
            component: 'main',
            maxWidth: 'md',
            children: [
              Object(a.jsx)(Yn, {}),
              Object(a.jsx)($.a, {
                children: 'Create Proposal - Finish (Review)'
              }),
              Object(a.jsx)($.a, {
                children: i.isCustomProposal
                  ? 'Custom Proposal'
                  : 'Supervisor Defined Proposal'
              }),
              i.isCustomProposal
                ? null
                : Object(a.jsxs)(a.Fragment, {
                    children: [
                      Object(a.jsx)(Je, {
                        label: 'Related Topic',
                        value:
                          null === i ||
                          void 0 === i ||
                          null === (t = i.topic) ||
                          void 0 === t
                            ? void 0
                            : t.title,
                        readOnly: !0
                      }),
                      Object(a.jsx)(Je, {
                        label: 'Supervisor',
                        value:
                          null === i ||
                          void 0 === i ||
                          null === (n = i.topic) ||
                          void 0 === n ||
                          null === (r = n.supervisor) ||
                          void 0 === r
                            ? void 0
                            : r.displayName,
                        readOnly: !0
                      })
                    ]
                  }),
              Object(a.jsx)(Je, {
                label: 'Title',
                value: i.title,
                readOnly: !0
              }),
              Object(a.jsx)(Ge, {
                label: 'Description',
                value: i.description,
                readOnly: !0
              }),
              Object(a.jsx)(Ge, {
                label: 'Additional Notes',
                value: i.additionalNotes,
                readOnly: !0
              }),
              i.isCustomProposal
                ? Object(a.jsxs)(a.Fragment, {
                    children: [
                      Object(a.jsx)(Ge, {
                        label: 'Environment',
                        value: i.environment,
                        readOnly: !0
                      }),
                      Object(a.jsx)(Ge, {
                        label: 'Languages',
                        value: i.languages,
                        readOnly: !0
                      })
                    ]
                  })
                : null,
              4 === l.phase
                ? Object(a.jsxs)(a.Fragment, {
                    children: [
                      Object(a.jsx)(ke, {
                        loading: j,
                        onClick: function () {
                          return x(!0)
                        },
                        endIcon: Object(a.jsx)(_t.a, {
                          title: 'Not editable after submission',
                          children: Object(a.jsx)(ea.a, {})
                        }),
                        children: 'Submit Proposal'
                      }),
                      Object(a.jsx)(ke, {
                        loading: j,
                        onClick: function () {
                          return x(!1)
                        },
                        endIcon: Object(a.jsx)(_t.a, {
                          title: 'Editable until submitted',
                          children: Object(a.jsx)(ea.a, {})
                        }),
                        children: 'Save Proposal as Draft'
                      })
                    ]
                  })
                : Object(a.jsx)(ke, {
                    loading: j,
                    onClick: function () {
                      return x(!0)
                    },
                    endIcon: Object(a.jsx)(_t.a, {
                      title: 'Not editable after submission',
                      children: Object(a.jsx)(ea.a, {})
                    }),
                    children: 'Submit Proposal'
                  })
            ]
          })
        },
        na =
          (Ie.b({
            email: Ie.c().email().required(),
            accountType: Ie.c().required()
          }),
          function (e) {
            return Object(a.jsx)(ue.a, {
              maxWidth: 'lg',
              children: Object(a.jsx)($.a, {
                align: 'center',
                style: { marginTop: '25px' },
                children: 'You have not been allowed access to this system.'
              })
            })
          }),
        aa = function () {
          return Object(a.jsxs)(ue.a, {
            maxWidth: 'md',
            children: [
              Object(a.jsx)($.a, {
                align: 'center',
                variant: 'h3',
                children: 'The requested page could not be found'
              }),
              Object(a.jsx)('br', {}),
              Object(a.jsx)('center', {
                children: Object(a.jsx)(i.b, {
                  to: '/',
                  children: Object(a.jsx)(de.a, {
                    variant: 'contained',
                    color: 'primary',
                    children: 'Back to Homepage'
                  })
                })
              })
            ]
          })
        },
        sa = function (e) {
          var t = Object(s.useState)(!1),
            n = Object(p.a)(t, 2),
            r = n[0],
            o = (n[1], Object(s.useState)([])),
            c = Object(p.a)(o, 2),
            l = c[0],
            d = c[1],
            u = Object(h.g)().topicId
          return (
            Object(s.useEffect)(function () {
              q.get('/topic/proposals/'.concat(u))
                .then(function (e) {
                  console.log(e), d(e.data.proposals)
                })
                .catch(function (e) {
                  console.log(e)
                })
            }, []),
            Object(a.jsxs)(ue.a, {
              maxWidth: 'lg',
              children: [
                Object(a.jsx)(en, {}),
                Object(a.jsx)($.a, { children: 'Student Proposals' }),
                Object(a.jsx)(pe.a, {
                  component: je.a,
                  children: Object(a.jsxs)(he.a, {
                    'aria-label': 'simple table',
                    children: [
                      Object(a.jsx)(Oe.a, {
                        children: Object(a.jsxs)(ge.a, {
                          children: [
                            Object(a.jsx)(xe.a, { children: 'Title' }),
                            Object(a.jsx)(xe.a, {
                              align: 'center',
                              children: 'Student'
                            }),
                            Object(a.jsx)(xe.a, {
                              align: 'right',
                              children: 'Status'
                            })
                          ]
                        })
                      }),
                      Object(a.jsx)(fe.a, {
                        children: r
                          ? Object(a.jsx)(
                              ge.a,
                              {
                                children: Object(a.jsx)(xe.a, {
                                  colSpan: 3,
                                  align: 'center',
                                  children: 'Loading Values ...'
                                })
                              },
                              'loading_supervisor_proposals'
                            )
                          : 0 === l.length
                          ? Object(a.jsx)(
                              ge.a,
                              {
                                children: Object(a.jsx)(xe.a, {
                                  colSpan: 3,
                                  align: 'center',
                                  children: 'You have no proposals to review'
                                })
                              },
                              'no_supervisor_proposals'
                            )
                          : l.map(function (e) {
                              return Object(a.jsxs)(
                                ge.a,
                                {
                                  children: [
                                    Object(a.jsx)(xe.a, {
                                      children: Object(a.jsx)(i.b, {
                                        to: '/proposal/view/'.concat(e._id),
                                        children: e.title
                                      })
                                    }),
                                    Object(a.jsx)(xe.a, {
                                      align: 'center',
                                      children: e.student.displayName
                                    }),
                                    Object(a.jsx)(xe.a, {
                                      align: 'right',
                                      children: Dn(e.status)
                                    })
                                  ]
                                },
                                e.id
                              )
                            })
                      })
                    ]
                  })
                })
              ]
            })
          )
        }
      sa.defaultProps = {
        topic: {},
        dialogOpen: !1,
        setDialogOpen: function () {},
        refresh: function () {}
      }
      var ra = sa,
        oa = n(488),
        ca = Ie.b({
          responseType: Ie.c().oneOf(
            ['pending_edits', 'accepted', 'rejected'],
            'Please select a response type'
          ),
          message: Ie.c().when('responseType', {
            is: 'pending_edits',
            then: Ie.c().required(
              'Must include a message when requesting edits'
            )
          })
        }),
        ia = { responseType: 'unselected', message: '' },
        la = function (e) {
          var t,
            n,
            r = Object(s.useState)(),
            o = Object(p.a)(r, 2),
            c = o[0],
            i = o[1],
            l = Object(s.useState)(!0),
            d = Object(p.a)(l, 2),
            u = d[0],
            j = d[1],
            b = Object(s.useState)(!1),
            O = Object(p.a)(b, 2),
            g = O[0],
            x = O[1],
            f = Object(Ae.c)({
              resolver: Object(De.yupResolver)(ca),
              reValidateMode: 'onChange',
              defaultValues: ia
            }),
            v = f.register,
            m = f.handleSubmit,
            y = f.errors,
            S = f.control,
            C = Object(h.g)().id
          Object(s.useEffect)(function () {
            P()
          }, [])
          var P = function () {
            q.get('/proposal/'.concat(C))
              .then(function (e) {
                console.log(e), i(e.data.proposal)
              })
              .catch(function (e) {
                console.log(e)
              })
              .finally(function () {
                j(!1)
              })
          }
          return u
            ? Object(a.jsx)('h1', { children: 'Loading' })
            : Object(a.jsxs)(ue.a, {
                maxWidth: 'lg',
                children: [
                  Object(a.jsx)(en, {}),
                  Object(a.jsx)($.a, { children: 'Proposal Details' }),
                  Object(a.jsx)(Je, {
                    value: c.title,
                    label: 'Title',
                    variant: 'outlined',
                    readOnly: !0
                  }),
                  Object(a.jsx)(Ge, {
                    label: 'Description',
                    value: c.description,
                    readOnly: !0
                  }),
                  Object(a.jsx)(Ge, {
                    label: 'Choose Me Message',
                    value: c.chooseMessage,
                    readOnly: !0
                  }),
                  Object(a.jsx)(Ge, {
                    label: 'Additional Notes',
                    value: c.additionalNotes,
                    readOnly: !0
                  }),
                  'studentDefined' === c.type
                    ? Object(a.jsxs)(a.Fragment, {
                        children: [
                          Object(a.jsx)(Ge, {
                            label: 'Environment',
                            value: c.environment,
                            readOnly: !0
                          }),
                          Object(a.jsx)(Ge, {
                            label: 'Languages',
                            value: c.languages,
                            readOnly: !0
                          })
                        ]
                      })
                    : null,
                  'submitted' === c.status &&
                    Object(a.jsx)(N, {
                      I: 'respond',
                      this: new J(c),
                      children: Object(a.jsx)('form', {
                        onSubmit: m(function (e) {
                          x(!0),
                            q
                              .post('/proposal/respond/'.concat(c._id), e)
                              .then(function (e) {
                                console.log(e), P()
                              })
                              .catch(function (e) {
                                console.log(e)
                              })
                              .finally(function () {
                                x(!1)
                              })
                        }),
                        children: Object(a.jsxs)(je.a, {
                          elevation: 2,
                          style: { padding: '20px', marginTop: '10px' },
                          children: [
                            Object(a.jsx)($.a, {
                              align: 'center',
                              component: 'h1',
                              variant: 'h5',
                              children: 'Proposal Response'
                            }),
                            Object(a.jsxs)(oa.a, {
                              container: !0,
                              children: [
                                Object(a.jsxs)(oa.a, {
                                  item: !0,
                                  xs: 2,
                                  children: [
                                    Object(a.jsx)(Be.a, {
                                      variant: 'outlined',
                                      style: { width: '100%' },
                                      error: !!y.responseType,
                                      children: Object(a.jsx)(Ae.a, {
                                        render: function (e) {
                                          var t = e.onChange,
                                            n = e.value
                                          return Object(a.jsxs)(qe.a, {
                                            value: n,
                                            onChange: function (e) {
                                              return t(e.target.value)
                                            },
                                            style: { marginTop: '16px' },
                                            children: [
                                              Object(a.jsx)(ze.a, {
                                                value: 'unselected',
                                                selected: !0,
                                                disabled: !0,
                                                children: 'Choose One'
                                              }),
                                              Object(a.jsx)(ze.a, {
                                                value: 'pending_edits',
                                                style: { color: 'orange' },
                                                children: 'Request Edits'
                                              }),
                                              Object(a.jsx)(ze.a, {
                                                value: 'accepted',
                                                style: { color: 'green' },
                                                children: 'Accept'
                                              }),
                                              Object(a.jsx)(ze.a, {
                                                value: 'rejected',
                                                style: { color: 'red' },
                                                children: 'Reject'
                                              })
                                            ]
                                          })
                                        },
                                        name: 'responseType',
                                        control: S
                                      })
                                    }),
                                    Object(a.jsx)(Ze.a, {
                                      error: !!y.responseType,
                                      children:
                                        null === y ||
                                        void 0 === y ||
                                        null === (t = y.responseType) ||
                                        void 0 === t
                                          ? void 0
                                          : t.message
                                    })
                                  ]
                                }),
                                Object(a.jsx)(oa.a, {
                                  item: !0,
                                  xs: 8,
                                  children: Object(a.jsx)(Je, {
                                    inputRef: v,
                                    name: 'message',
                                    placeholder: 'Message to Student',
                                    error: !!y.message,
                                    helperText:
                                      null === y ||
                                      void 0 === y ||
                                      null === (n = y.message) ||
                                      void 0 === n
                                        ? void 0
                                        : n.message
                                  })
                                }),
                                Object(a.jsx)(oa.a, {
                                  item: !0,
                                  xs: 2,
                                  children: Object(a.jsx)(ke, {
                                    style: {
                                      height: '56px',
                                      marginTop: '16px'
                                    },
                                    loading: g,
                                    children: 'Submit'
                                  })
                                })
                              ]
                            })
                          ]
                        })
                      })
                    })
                ]
              })
        },
        da = n(71),
        ua = n.n(da),
        ja = n(491),
        ba = function (e) {
          var t = Object(s.useState)(!0),
            n = Object(p.a)(t, 2),
            r = n[0],
            o = n[1],
            c = Object(s.useState)(!1),
            i = Object(p.a)(c, 2),
            l = i[0],
            d = i[1],
            u = Object(s.useState)(),
            j = Object(p.a)(u, 2),
            b = j[0],
            h = j[1],
            O = Object(s.useState)({ message: '', severity: 'success' }),
            g = Object(p.a)(O, 2),
            x = g[0],
            f = g[1],
            v = Object(s.useState)(!1),
            m = Object(p.a)(v, 2),
            y = m[0],
            S = m[1]
          Object(s.useEffect)(function () {
            q.get('/phase/all')
              .then(function (e) {
                console.log(e)
                var t = e.data.phases.map(function (e) {
                  return { phase: e._id, date: ua()(e.start_date) }
                })
                console.log(t), h(t)
              })
              .catch(function (e) {
                console.log(e)
              })
              .finally(function () {
                o(!1)
              })
          }, [])
          return r
            ? Object(a.jsx)('h1', { children: 'Loading' })
            : Object(a.jsxs)(ue.a, {
                maxWidth: 'lg',
                children: [
                  Object(a.jsx)($.a, {
                    variant: 'h4',
                    align: 'center',
                    children: 'Phase Management'
                  }),
                  Object(a.jsx)($.a, {
                    children:
                      'To select a date, open the date selection input, select your required date, and click the "Ok" button in the bottom right of the input panel.'
                  }),
                  Object(a.jsx)(pe.a, {
                    component: je.a,
                    children: Object(a.jsxs)(he.a, {
                      'aria-label': 'simple table',
                      children: [
                        Object(a.jsx)(Oe.a, {
                          children: Object(a.jsxs)(ge.a, {
                            children: [
                              Object(a.jsx)(xe.a, { children: 'Phase No.' }),
                              Object(a.jsx)(xe.a, {
                                children: 'Phase Start Date'
                              })
                            ]
                          })
                        }),
                        Object(a.jsx)(fe.a, {
                          children:
                            0 === b.length
                              ? Object(a.jsx)(ge.a, {
                                  children: Object(a.jsx)(xe.a, {
                                    children: 'No Phases to display'
                                  })
                                })
                              : b.map(function (e) {
                                  return Object(a.jsxs)(
                                    ge.a,
                                    {
                                      children: [
                                        Object(a.jsx)(xe.a, {
                                          children: e.phase
                                        }),
                                        Object(a.jsx)(xe.a, {
                                          children: Object(a.jsx)(ja.a, {
                                            defaultValue: e.date,
                                            onOk: function (t) {
                                              return (function (e, t) {
                                                console.log(
                                                  'Updating phase',
                                                  t,
                                                  e
                                                )
                                                var n = Object(lt.a)(b)
                                                ;(n[t - 1].date = e),
                                                  console.log(n),
                                                  h(n)
                                              })(t, e.phase)
                                            },
                                            format: 'DD / MMM / YY HH:mm',
                                            showTime: { format: 'HH:mm' },
                                            size: 'large',
                                            renderExtraFooter: function () {
                                              return 'Phase will end 5 minutes before following phase start'
                                            }
                                          })
                                        })
                                      ]
                                    },
                                    e.id
                                  )
                                })
                        })
                      ]
                    })
                  }),
                  Object(a.jsx)(ke, {
                    onClick: function () {
                      for (var e = 0; e < b.length; e++) {
                        var t = b[e]
                        if (e < b.length - 1 && t.date.isAfter(b[e + 1].date))
                          return (
                            f({
                              message: 'Phase '
                                .concat(
                                  t.phase,
                                  ' start date must be before Phase '
                                )
                                .concat(t.phase + 1, "'s start date"),
                              severity: 'error',
                              hidden: !1
                            }),
                            void S(!0)
                          )
                      }
                      var n = b.map(function (e) {
                        return { phase: e.phase, date: e.date }
                      })
                      d(!0),
                        q
                          .post('/phase/edit', { phases: n })
                          .then(function (e) {
                            console.log(e),
                              f({
                                hidden: !1,
                                message: 'Phase dates updated',
                                severity: 'success'
                              })
                          })
                          .catch(function (e) {
                            console.log(e),
                              f({
                                message: 'Phase dates not updated',
                                severity: 'error'
                              })
                          })
                          .finally(function () {
                            d(!1), S(!0)
                          })
                    },
                    loading: l,
                    children: 'Update Phase Dates'
                  }),
                  Object(a.jsx)(xt, {
                    open: y,
                    setOpen: S,
                    message: x.message,
                    severity: x.severity
                  })
                ]
              })
        },
        pa = Object(Pe.a)(function (e) {
          return {
            heading: { fontSize: '28px' },
            paragraph: { fontSize: '16px' }
          }
        })
      function ha() {
        var e = pa()
        return Object(a.jsxs)(ue.a, {
          maxWidth: 'lg',
          children: [
            Object(a.jsx)($.a, {
              className: e.heading,
              children: 'What are Topics?'
            }),
            Object(a.jsx)($.a, {
              className: e.paragraph,
              children:
                'A topic is a FYP project idea which is supplied by a Supervisor.'
            }),
            Object(a.jsx)($.a, {
              className: e.heading,
              children: 'What are Proposals?'
            }),
            Object(a.jsx)($.a, {
              className: e.paragraph,
              children:
                'A proposal is a students intrepretation of a topic, proposals can be both supervisor defined (The Supervisor has thought of the idea) or student defined (The Student has thought of the idea). Student defined proposals can only be sent to supervisors who have made themselves available to supervise these types of project ideas.'
            }),
            Object(a.jsx)($.a, {
              className: e.heading,
              children: 'What are Phases?'
            }),
            Object(a.jsx)($.a, {
              className: e.paragraph,
              children:
                'Phases are used to allow specific actions to be carried out during different time ranges.'
            })
          ]
        })
      }
      var Oa = function (e) {
        return Object(a.jsx)(ue.a, {
          maxWidth: 'md',
          children: Object(a.jsxs)('center', {
            children: [
              Object(a.jsx)($.a, {
                children:
                  'Unable to connect to API Service, please try refreshing the page.'
              }),
              Object(a.jsx)('br', {}),
              Object(a.jsx)($.a, {
                children:
                  'If the issue persists, please ensure you have an internet connection.'
              })
            ]
          })
        })
      }
      var ga = function (e) {
          var t,
            n = R(e.user),
            r = Object(s.useContext)(T).currentPhase,
            o = function (e) {
              return Array.isArray(e) ? e.includes(r.phase) : e === r.phase
            }
          return Object(a.jsxs)(h.c, {
            children: [
              Object(a.jsx)(h.a, {
                exact: !0,
                path: '/',
                children:
                  0 !== r.phase
                    ? (
                        null === e ||
                        void 0 === e ||
                        null === (t = e.user) ||
                        void 0 === t
                          ? void 0
                          : t.role
                      )
                      ? Object(a.jsx)(Ct, {})
                      : Object(a.jsx)(na, {})
                    : Object(a.jsx)('h1', {
                        children: 'Switching Phase Please Wait'
                      })
              }),
              Object(a.jsx)(h.a, {
                exact: !0,
                path: '/help',
                children: Object(a.jsx)(ha, {})
              }),
              Object(a.jsx)(h.a, {
                path: '/api-unavailable',
                children: Object(a.jsx)(Oa, {})
              }),
              n.can('read', 'Topic') &&
                o([3, 4]) &&
                Object(a.jsx)(h.a, {
                  exact: !0,
                  path: '/topics',
                  children: Object(a.jsx)(jt, {})
                }),
              Object(a.jsx)(h.a, {
                path: '/topics/view/:id',
                children: Object(a.jsx)(Gn, {})
              }),
              n.can('create', 'Topic') &&
                o(2) &&
                Object(a.jsx)(h.a, { path: '/topics/add', component: ft }),
              n.can('manage', 'Topic') &&
                o([2, 3, 4]) &&
                Object(a.jsx)(h.a, { path: '/topics/manage', component: it }),
              n.can('read', 'Proposal') &&
                Object(a.jsx)(h.a, {
                  path: '/topic/:topicId',
                  children: Object(a.jsx)(ra, {})
                }),
              n.can('manage', 'Proposal') &&
                Object(a.jsx)(h.a, {
                  exact: !0,
                  path: '/proposals',
                  component: Vn
                }),
              n.can('create', 'Proposal') &&
                Object(a.jsx)(h.a, {
                  exact: !0,
                  path: '/proposals/add/step2',
                  children: Object(a.jsx)(Q, {
                    children: Object(a.jsx)(Xn, {})
                  })
                }),
              n.can('create', 'Proposal') &&
                Object(a.jsx)(h.a, {
                  exact: !0,
                  path: '/proposals/add/finish',
                  children: Object(a.jsx)(Q, {
                    children: Object(a.jsx)(ta, {})
                  })
                }),
              n.can('create', 'Proposal') &&
                Object(a.jsx)(h.a, {
                  path: '/proposals/add/:topicId?',
                  children: Object(a.jsx)(Q, {
                    children: Object(a.jsx)(Kn, {})
                  })
                }),
              n.can('read', 'Proposal') &&
                Object(a.jsx)(h.a, {
                  exact: !0,
                  path: '/proposal/view/:id',
                  children: Object(a.jsx)(la, {})
                }),
              n.can('manage', 'Student') &&
                Object(a.jsx)(h.a, {
                  path: '/student/assign',
                  children: Object(a.jsx)(tn, {})
                }),
              n.can('manage', 'Student') &&
                Object(a.jsx)(h.a, {
                  path: '/student/manage',
                  children: Object(a.jsx)(on, {})
                }),
              n.can('manage', 'Supervisor') &&
                Object(a.jsx)(h.a, {
                  path: '/supervisor/assign',
                  children: Object(a.jsx)(cn, {})
                }),
              n.can('manage', 'Supervisor') &&
                Object(a.jsx)(h.a, {
                  path: '/supervisor/manage',
                  children: Object(a.jsx)(ln, {})
                }),
              n.can('manage', 'Coordinator') &&
                o(1) &&
                Object(a.jsx)(h.a, {
                  path: '/coordinator',
                  children: Object(a.jsx)(On, {})
                }),
              n.can('update', 'Phase') &&
                Object(a.jsx)(h.a, {
                  path: '/phase/manage',
                  children: Object(a.jsx)(ba, {})
                }),
              Object(a.jsx)(h.a, { component: aa })
            ]
          })
        },
        xa = function () {
          var e = Object(s.useState)(!1),
            t = Object(p.a)(e, 2),
            n = t[0],
            r = t[1],
            o = Object(O.d)(),
            c = o.instance,
            i = o.accounts,
            l = o.inProgress,
            h = Object(O.c)(i[0] || {}),
            f = Object(s.useContext)(m),
            y = f.user,
            S = f.setUserObject,
            C = Object(s.useContext)(T).setCurrentPhase,
            w = Object(b.a)({}, v)
          return (
            Object(s.useEffect)(
              function () {
                h &&
                  'none' === l &&
                  (console.log('Setting up api'),
                  B(c, h)
                    .then(function (e) {
                      var t, n
                      console.log('API Setup returned', e),
                        (t = c),
                        (n = h),
                        H || ((z = t), (V = n), (H = !0)),
                        c
                          .acquireTokenSilent(
                            Object(b.a)(Object(b.a)({}, v), {}, { account: h })
                          )
                          .then(
                            (function () {
                              var e = Object(j.a)(
                                d.a.mark(function e(t) {
                                  return d.a.wrap(function (e) {
                                    for (;;)
                                      switch ((e.prev = e.next)) {
                                        case 0:
                                          console.log('User is logged in'),
                                            Y.get(
                                              ''.concat(
                                                x.endpoints.graph,
                                                '/me/appRoleAssignments'
                                              )
                                            )
                                              .then(
                                                (function () {
                                                  var e = Object(j.a)(
                                                    d.a.mark(function e(t) {
                                                      var n,
                                                        a,
                                                        s,
                                                        o,
                                                        c,
                                                        i,
                                                        l,
                                                        j,
                                                        b,
                                                        p,
                                                        O
                                                      return d.a.wrap(
                                                        function (e) {
                                                          for (;;)
                                                            switch (
                                                              (e.prev = e.next)
                                                            ) {
                                                              case 0:
                                                                ;(n = -1),
                                                                  (a = null),
                                                                  (s = Object(
                                                                    u.a
                                                                  )(
                                                                    t.data.value
                                                                  )),
                                                                  (e.prev = 3),
                                                                  s.s()
                                                              case 5:
                                                                if (
                                                                  (o = s.n())
                                                                    .done
                                                                ) {
                                                                  e.next = 15
                                                                  break
                                                                }
                                                                if (
                                                                  ((c =
                                                                    o.value),
                                                                  (i =
                                                                    x.appRoles[
                                                                      c
                                                                        .appRoleId
                                                                    ]))
                                                                ) {
                                                                  e.next = 11
                                                                  break
                                                                }
                                                                return (
                                                                  console.log(
                                                                    'Unknown role: ' +
                                                                      JSON.stringify(
                                                                        c
                                                                      )
                                                                  ),
                                                                  e.abrupt(
                                                                    'continue',
                                                                    13
                                                                  )
                                                                )
                                                              case 11:
                                                                ;(l =
                                                                  i.priority),
                                                                  (j =
                                                                    i.displayName),
                                                                  l > n &&
                                                                    ((n = l),
                                                                    (a = j))
                                                              case 13:
                                                                e.next = 5
                                                                break
                                                              case 15:
                                                                e.next = 20
                                                                break
                                                              case 17:
                                                                ;(e.prev = 17),
                                                                  (e.t0 = e.catch(
                                                                    3
                                                                  )),
                                                                  s.e(e.t0)
                                                              case 20:
                                                                return (
                                                                  (e.prev = 20),
                                                                  s.f(),
                                                                  e.finish(20)
                                                                )
                                                              case 23:
                                                                return (
                                                                  (e.next = 25),
                                                                  q
                                                                    .get(
                                                                      '/phase'
                                                                    )
                                                                    .catch(
                                                                      function (
                                                                        e
                                                                      ) {
                                                                        console.log(
                                                                          'Could not retrieve phase'
                                                                        ),
                                                                          console.log(
                                                                            e
                                                                          )
                                                                      }
                                                                    )
                                                                )
                                                              case 25:
                                                                ;(b = e.sent),
                                                                  (p = null),
                                                                  (p = b.data
                                                                    .phase
                                                                    ? new P({
                                                                        phase:
                                                                          b.data
                                                                            .phase
                                                                            ._id,
                                                                        startDate:
                                                                          b.data
                                                                            .phase
                                                                            .start_date,
                                                                        endDate:
                                                                          b.data
                                                                            .phase
                                                                            .end_date
                                                                      })
                                                                    : new P({
                                                                        phase: 0,
                                                                        startDate: null,
                                                                        endDate: null
                                                                      })),
                                                                  C(p),
                                                                  (O = {
                                                                    role: a,
                                                                    id:
                                                                      h.localAccountId
                                                                  }),
                                                                  S(O),
                                                                  r(!0)
                                                              case 31:
                                                              case 'end':
                                                                return e.stop()
                                                            }
                                                        },
                                                        e,
                                                        null,
                                                        [[3, 17, 20, 23]]
                                                      )
                                                    })
                                                  )
                                                  return function (t) {
                                                    return e.apply(
                                                      this,
                                                      arguments
                                                    )
                                                  }
                                                })()
                                              )
                                              .catch(function (e) {
                                                alert(
                                                  'Could not initialise your account, please try again'
                                                ),
                                                  console.log(e)
                                              })
                                        case 2:
                                        case 'end':
                                          return e.stop()
                                      }
                                  }, e)
                                })
                              )
                              return function (t) {
                                return e.apply(this, arguments)
                              }
                            })()
                          )
                    })
                    .catch(function (e) {
                      console.log(e), alert('Unable to connect to API')
                    }))
              },
              [h, l, c]
            ),
            Object(a.jsx)(O.a, {
              interactionType: g.b.Redirect,
              authenticationRequest: w,
              errorComponent: ee,
              loadingComponent: te,
              children: n
                ? Object(a.jsxs)(A.Provider, {
                    value: R(y),
                    children: [
                      Object(a.jsx)(_n, {}),
                      Object(a.jsx)(K.a, {}),
                      Object(a.jsx)(ga, { user: y })
                    ]
                  })
                : Object(a.jsx)(ne, {})
            })
          )
        },
        fa = (n(413), n(490)),
        va = n(489),
        ma = n(250),
        ya = n.n(ma),
        Sa = Object(va.a)({
          palette: {
            primary: { main: '#556cd6' },
            secondary: { main: '#f55d42' },
            error: { main: ya.a.A400 },
            background: { default: '#fff' }
          }
        }),
        Ca = new g.c(f),
        Pa = function () {
          return Object(a.jsx)(i.a, {
            children: Object(a.jsx)(fa.a, {
              theme: Sa,
              children: Object(a.jsx)(O.b, {
                instance: Ca,
                children: Object(a.jsx)(y, {
                  children: Object(a.jsx)(w, {
                    children: Object(a.jsx)(r.a.StrictMode, {
                      children: Object(a.jsx)(xa, {})
                    })
                  })
                })
              })
            })
          })
        }
      c.a.render(Object(a.jsx)(Pa, {}), document.getElementById('root'))
    }
  },
  [[414, 1, 2]]
])
//# sourceMappingURL=main.cbe1e8de.chunk.js.map
