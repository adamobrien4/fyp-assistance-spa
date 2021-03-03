;(this['webpackJsonpmsal-react-app'] =
  this['webpackJsonpmsal-react-app'] || []).push([
  [0],
  {
    398: function (e, t) {},
    400: function (e, t) {},
    411: function (e, t, n) {},
    412: function (e, t, n) {
      'use strict'
      n.r(t)
      var a = n(1),
        s = n(0),
        c = n.n(s),
        o = n(25),
        r = n.n(o),
        i = n(24),
        l = n(22),
        d = n.n(l),
        u = n(32),
        j = n(34),
        b = n(20),
        h = n(8),
        p = n(39),
        O = n(74),
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
            customApi: 'http://localhost:5000'
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
            redirectUri: Object({
              NODE_ENV: 'production',
              PUBLIC_URL: '',
              WDS_SOCKET_HOST: void 0,
              WDS_SOCKET_PATH: void 0,
              WDS_SOCKET_PORT: void 0,
              FAST_REFRESH: !0,
              REACT_APP_API_URL: 'http://localhost:5000',
              REACT_APP_AZURE_APPLICATION_RESOURCE_ID:
                'a53c68a6-b4f3-41e0-ba01-cf96fe5d7c29',
              REACT_APP_AZURE_CLIENT_ID: '3ee9d15a-60e1-4aea-b21d-bd09d831e62c',
              REACT_APP_AZURE_CUSTOM_API_SCOPE:
                'api://54ee17f8-21c1-4891-931d-25e1ed8cfe06/Site.Access',
              REACT_APP_AZURE_TENANT_ID: 'a7dbec41-2d60-49c3-a1c8-790d52eaec3c',
              REACT_APP_MS_GRAPH_ENDPOINT: 'https://graph.microsoft.com/v1.0',
              REACT_APP_MS_LOGIN_ENDPOINT: 'https://login.microsoftonline.com',
              REACT_APP_POST_LOGOUT_URL: 'http://localhost:5000',
              REACT_APP_REDIRECT_URL: 'http://localhost:3000',
              REACT_APP_ROOT_URL: 'http://localhost:3000',
              REACT_APP_STAGE: 'dev'
            }).REACT_APP_DEV_REDIRECT_URL,
            postLogoutRedirectUri: Object({
              NODE_ENV: 'production',
              PUBLIC_URL: '',
              WDS_SOCKET_HOST: void 0,
              WDS_SOCKET_PATH: void 0,
              WDS_SOCKET_PORT: void 0,
              FAST_REFRESH: !0,
              REACT_APP_API_URL: 'http://localhost:5000',
              REACT_APP_AZURE_APPLICATION_RESOURCE_ID:
                'a53c68a6-b4f3-41e0-ba01-cf96fe5d7c29',
              REACT_APP_AZURE_CLIENT_ID: '3ee9d15a-60e1-4aea-b21d-bd09d831e62c',
              REACT_APP_AZURE_CUSTOM_API_SCOPE:
                'api://54ee17f8-21c1-4891-931d-25e1ed8cfe06/Site.Access',
              REACT_APP_AZURE_TENANT_ID: 'a7dbec41-2d60-49c3-a1c8-790d52eaec3c',
              REACT_APP_MS_GRAPH_ENDPOINT: 'https://graph.microsoft.com/v1.0',
              REACT_APP_MS_LOGIN_ENDPOINT: 'https://login.microsoftonline.com',
              REACT_APP_POST_LOGOUT_URL: 'http://localhost:5000',
              REACT_APP_REDIRECT_URL: 'http://localhost:3000',
              REACT_APP_ROOT_URL: 'http://localhost:3000',
              REACT_APP_STAGE: 'dev'
            }).REACT_APP_DEV_POST_LOGOUT_URL
          }
        },
        v = {
          authority: ''.concat(x.endpoints.login, '/').concat(x.auth.tenantId),
          scopes: ['user.read', 'offline_access']
        },
        m = Object(s.createContext)(),
        y = function (e) {
          var t = Object(s.useState)(null),
            n = Object(h.a)(t, 2),
            c = n[0],
            o = n[1]
          return Object(a.jsx)(m.Provider, {
            value: {
              user: c,
              setUserObject: function (e) {
                o(e)
              }
            },
            children: e.children
          })
        },
        S = n(33),
        C = function e(t) {
          Object(S.a)(this, e), Object.assign(this, t)
        },
        P = Object(s.createContext)(),
        T = function (e) {
          var t = Object(s.useState)(null),
            n = Object(h.a)(t, 2),
            c = n[0],
            o = n[1]
          return Object(a.jsx)(P.Provider, {
            value: {
              currentPhase: new C(Object(b.a)({}, c)),
              setCurrentPhase: function (e) {
                o(e)
              }
            },
            children: e.children
          })
        },
        w = n(227),
        A = Object(s.createContext)(),
        k = Object(w.a)(A.Consumer),
        _ = n(184)
      function N(e) {
        var t = new _.b(_.a),
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
              n('manage', 'Topic', { supervisor: e.id })
            break
          case 'Administrator':
            n('manage', 'Coordinator'), n('update', 'Phase')
            break
          default:
            a('*', '*')
        }
        return s()
      }
      var R = n(86),
        E = n.n(R),
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
        D = null,
        M = null,
        L = !1,
        U = E.a.create({ baseURL: x.endpoints.customApi, timeout: 4e3 })
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
                          account: M
                        }),
                        (e.next = 5),
                        I(D, n)
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
      var W = U,
        F = null,
        B = null,
        q = !1,
        V = E.a.create({ baseURL: x.endpoints.graph, timeout: 4e3 })
      V.interceptors.request.use(
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
                          account: B
                        }),
                        (e.next = 4),
                        I(F, n)
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
      var z = V,
        H = n(479),
        G = Object(s.createContext)(),
        Y = function (e) {
          var t = e.children,
            n = Object(s.useState)({
              step: 0,
              isCustomProposal: !1,
              topic: null
            }),
            c = Object(h.a)(n, 2),
            o = c[0],
            r = c[1]
          return Object(a.jsx)(G.Provider, {
            value: {
              contextData: o,
              setContextData: function (e) {
                r(function (t) {
                  return Object(b.a)(Object(b.a)({}, t), e)
                })
              }
            },
            children: t
          })
        },
        Z = function () {
          return Object(s.useContext)(G)
        },
        J = n(87)
      function K(e) {
        var t = e.error
        return (
          console.log(t),
          Object(a.jsxs)(J.a, {
            variant: 'h6',
            children: ['An Error Occurred: ', t.errorCode]
          })
        )
      }
      function Q() {
        return Object(a.jsx)(J.a, {
          variant: 'h6',
          children: 'Authentication in progress...'
        })
      }
      function X() {
        return Object(a.jsx)(J.a, {
          variant: 'h6',
          children: 'Getting things ready...'
        })
      }
      var $ = n(501),
        ee = n(459),
        te = n(462),
        ne = n(465),
        ae = n(466),
        se = n(498),
        ce = n(463),
        oe = n(453),
        re = n(467),
        ie = n(468),
        le = n(469),
        de = n(415),
        ue = n(470),
        je = n(471),
        be = n(472),
        he = n(473),
        pe = n(474),
        Oe = n(475),
        ge = {
          draft: 'Draft',
          suggestion: 'Ready for Submission',
          active: 'Active',
          archived: 'Archived',
          assigned: 'Assigned',
          prev_term: 'From Previous Term'
        },
        xe = function (e) {
          return ge[e]
        },
        fe = n(251),
        ve = n(452),
        me = Object(ve.a)(function (e) {
          return { root: { margin: e.spacing(3, 0, 2) } }
        }),
        ye = function (e) {
          var t = e.children,
            n = Object(fe.a)(e, ['children']),
            s = me()
          return Object(a.jsx)(
            oe.a,
            Object(b.a)(
              Object(b.a)(
                {
                  type: 'submit',
                  fullWidth: !0,
                  variant: 'contained',
                  color: 'primary',
                  className: s.root
                },
                n
              ),
              {},
              { children: t }
            )
          )
        },
        Se = n(29),
        Ce = n(115),
        Pe = n(417),
        Te = n(461),
        we = n(456),
        Ae = n(494),
        ke = n(503),
        _e = n(464),
        Ne = n(458),
        Re = n(460),
        Ee = n(160),
        Ie = n(45),
        De = n(13),
        Me = {
          title: '',
          description: '',
          additionalNotes: '',
          tags: [],
          targetCourses: []
        },
        Le = {
          title: De.d().required('Topic must have a title'),
          description: De.d().required('Toic must have a description'),
          tags: De.a(De.d()).min(
            1,
            'You must specify at least one tag for your Topic'
          ),
          additionalNotes: De.d(),
          targetCourses: De.a(De.d())
        },
        Ue = De.c().shape(Object(b.a)({}, Le)),
        We = De.c().shape(
          Object(b.a)(
            Object(b.a)({}, Le),
            {},
            {
              status: De.d().oneOf([
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
        Fe = n(500),
        Be = Object(s.forwardRef)(function (e, t) {
          return Object(a.jsx)(
            Fe.a,
            Object(b.a)(
              {
                variant: 'outlined',
                margin: 'normal',
                inputRef: t,
                fullWidth: !0,
                inputProps: { readOnly: !0 === e.readOnly }
              },
              e
            )
          )
        }),
        qe = Object(s.forwardRef)(function (e, t) {
          return Object(a.jsx)(
            Fe.a,
            Object(b.a)(
              {
                variant: 'outlined',
                margin: 'normal',
                inputRef: t,
                fullWidth: !0,
                multiline: !0,
                rows: 3,
                rowsMax: 6,
                inputProps: { readOnly: !0 === e.readOnly }
              },
              e
            )
          )
        }),
        Ve = n(491),
        ze = (n(393), n(457)),
        He = Ve.a.SHOW_PARENT,
        Ge = function (e) {
          var t = Object(s.useState)(null),
            n = Object(h.a)(t, 2),
            c = n[0],
            o = n[1],
            r = Object(s.useState)(!0),
            i = Object(h.a)(r, 2),
            l = i[0],
            d = i[1]
          Object(s.useEffect)(function () {
            W.get('/tag')
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
            showCheckedStrategy: He,
            placeholder: 'Search Topic Tags',
            bordered: !0,
            showSearch: !0,
            size: 'large'
          }
          if (l)
            return Object(a.jsx)(J.a, {
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
                  Ve.a,
                  Object(b.a)(
                    Object(b.a)({}, u),
                    {},
                    {
                      treeData: c,
                      style: {
                        width: '100%',
                        pointerEvents: e.disabled ? 'none' : 'auto'
                      }
                    }
                  )
                ),
                e.error &&
                  Object(a.jsx)(ze.a, {
                    error: e.error,
                    children: e.helperText
                  })
              ]
            })
          )
        },
        Ye = n(493),
        Ze = [
          'LM051 - Computer Systems',
          'LM052 - Course 2',
          'Lm053 - Course 3'
        ],
        Je = function (e) {
          var t = e.control,
            n = e.error,
            s = e.helperText,
            c = e.disabled,
            o = e.label
          return Object(a.jsx)(Se.a, {
            render: function (e) {
              var t = e.onChange,
                r = e.value
              return Object(a.jsx)(Ye.a, {
                multiple: !0,
                value: r,
                options: Ze,
                getOptionLabel: function (e) {
                  return e
                },
                defaultValue: r,
                disabled: c,
                filterSelectedOptions: !0,
                renderInput: function (e) {
                  return Object(a.jsx)(
                    Be,
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
        Ke = Object(ve.a)(function (e) {
          return {
            formControl: { minWidth: 300, flex: 1 },
            selectEmpty: { marginTop: e.spacing(2) },
            readOnlySelect: {
              width: 300,
              '&.Mui-disabled option': { color: 'black' }
            },
            buttonProgress: {
              color: Ee.a[500],
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
        Qe = function (e) {
          var t,
            n,
            c,
            o,
            r,
            i,
            l,
            d,
            u,
            j = Ke(),
            b = {
              title: (u = e.topic).title,
              description: u.description,
              tags: u.tags,
              additionalNotes: u.additionalNotes || '',
              targetCourses: u.targetCourses || [],
              status: u.status
            },
            p = Object(s.useState)(!1),
            O = Object(h.a)(p, 2),
            g = O[0],
            x = O[1],
            f = Object(s.useState)(!1),
            v = Object(h.a)(f, 2),
            m = v[0],
            y = v[1],
            S = Object(Se.c)({
              resolver: Object(Ie.yupResolver)(We),
              reValidateMode: 'onChange',
              defaultValues: b
            }),
            C = S.register,
            P = S.handleSubmit,
            T = S.errors,
            w = S.control,
            A = function () {
              x(!g)
            }
          return Object(a.jsxs)($.a, {
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
              Object(a.jsx)(Pe.a, {
                className: j.dialogCloseButton,
                onClick: function () {
                  ;(g &&
                    !1 ===
                      confirm(
                        'Unsaved changes will be lost!. Are you sure you want to exit?'
                      )) ||
                    e.setDialogOpen(!1)
                },
                disabled: m,
                children: Object(a.jsx)(Ne.a, {})
              }),
              Object(a.jsxs)(ee.a, {
                id: 'max-width-dialog-title',
                children: [
                  Object(a.jsx)(oe.a, {
                    variant: 'contained',
                    className: j.dialogEditButton,
                    color: g ? 'secondary' : 'primary',
                    onClick: A,
                    disabled: m,
                    endIcon: Object(a.jsx)(Re.a, {}),
                    children: 'Toggle Edit Mode'
                  }),
                  Object(a.jsx)(Te.a, {})
                ]
              }),
              Object(a.jsx)(te.a, {
                children: Object(a.jsxs)('form', {
                  onSubmit: P(function (t) {
                    var n = (function (t) {
                      var n = Ce.reduce(
                        t,
                        function (t, n, a) {
                          return Ce.isEqual(n, e.topic[a]) || (t[a] = n), t
                        },
                        {}
                      )
                      return (
                        console.log(n), Object.keys(n).length > 0 ? n : null
                      )
                    })(t)
                    console.log(n),
                      n
                        ? W.post('/topic/edit/'.concat(e.topic._id), n)
                            .then(function (t) {
                              console.log(t), e.refresh()
                            })
                            .catch(function (e) {
                              console.log(e)
                            })
                            .finally(function () {
                              y(!1), A()
                            })
                        : A()
                  }),
                  children: [
                    'regular' === e.topic.type
                      ? Object(a.jsxs)(a.Fragment, {
                          children: [
                            Object(a.jsxs)('div', {
                              style: {
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'stretch',
                                width: '100%'
                              },
                              children: [
                                Object(a.jsx)(Be, {
                                  ref: C,
                                  name: 'title',
                                  label: 'Title',
                                  disabled: !g,
                                  variant: 'outlined',
                                  margin: 'none',
                                  style: { flex: '3', marginRight: '40px' },
                                  error: !!T.title,
                                  helperText:
                                    null === T ||
                                    void 0 === T ||
                                    null === (t = T.title) ||
                                    void 0 === t
                                      ? void 0
                                      : t.message
                                }),
                                Object(a.jsx)(we.a, {
                                  variant: 'outlined',
                                  className: j.formControl,
                                  children: Object(a.jsx)(Se.a, {
                                    render: function (e) {
                                      var t = e.onChange,
                                        n = e.value
                                      return Object(a.jsxs)(Ae.a, {
                                        disabled: !g,
                                        value: n,
                                        onChange: t,
                                        children: [
                                          Object(a.jsx)(ke.a, {
                                            value: 'draft',
                                            children: 'Draft'
                                          }),
                                          Object(a.jsx)(ke.a, {
                                            value: 'suggestion',
                                            children: 'Ready for Submission'
                                          }),
                                          Object(a.jsx)(ke.a, {
                                            value: 'archived',
                                            style: { color: 'red' },
                                            children: 'Archived'
                                          }),
                                          Object(a.jsx)(ke.a, {
                                            value: 'active',
                                            disabled: !0,
                                            children: 'Active'
                                          }),
                                          Object(a.jsx)(ke.a, {
                                            value: 'assigned',
                                            disabled: !0,
                                            children: 'Assigned'
                                          }),
                                          Object(a.jsx)(ke.a, {
                                            value: 'prev_term',
                                            disabled: !0,
                                            children: 'From Previous Term'
                                          })
                                        ]
                                      })
                                    },
                                    name: 'status',
                                    control: w,
                                    error: !!T.status,
                                    helperText:
                                      null === T ||
                                      void 0 === T ||
                                      null === (n = T.status) ||
                                      void 0 === n
                                        ? void 0
                                        : n.message
                                  })
                                })
                              ]
                            }),
                            Object(a.jsx)(qe, {
                              inputRef: C,
                              name: 'description',
                              label: 'Description',
                              disabled: !g,
                              error: !!T.description,
                              helperText:
                                null === T ||
                                void 0 === T ||
                                null === (c = T.description) ||
                                void 0 === c
                                  ? void 0
                                  : c.message
                            }),
                            Object(a.jsx)(Se.a, {
                              control: w,
                              name: 'tags',
                              render: function (e) {
                                var t,
                                  n = e.onChange,
                                  s = e.value
                                return Object(a.jsx)(Ge, {
                                  value: s,
                                  onChange: function (e) {
                                    n(e)
                                  },
                                  error: !!(null === T || void 0 === T
                                    ? void 0
                                    : T.tags),
                                  helperText:
                                    null === T ||
                                    void 0 === T ||
                                    null === (t = T.tags) ||
                                    void 0 === t
                                      ? void 0
                                      : t.message,
                                  disabled: !g
                                })
                              }
                            }),
                            Object(a.jsx)(qe, {
                              inputRef: C,
                              label: 'Additional Notes',
                              name: 'additionalNotes',
                              disabled: !g,
                              error: !!T.additionalNotes,
                              helperText:
                                null === T ||
                                void 0 === T ||
                                null === (o = T.additionalNotes) ||
                                void 0 === o
                                  ? void 0
                                  : o.message
                            }),
                            Object(a.jsx)(Je, {
                              control: w,
                              error: !!T.targetCourses,
                              helperText:
                                null === T ||
                                void 0 === T ||
                                null === (r = T.targetCourses) ||
                                void 0 === r
                                  ? void 0
                                  : r.message,
                              disabled: !g
                            })
                          ]
                        })
                      : Object(a.jsxs)(a.Fragment, {
                          children: [
                            Object(a.jsx)(Be, {
                              label: 'Title',
                              value: b.title,
                              variant: 'outlined',
                              margin: 'none',
                              inputProps: { readOnly: !0 }
                            }),
                            Object(a.jsx)(qe, {
                              inputRef: C,
                              name: 'description',
                              label: 'Description',
                              disabled: !g,
                              error: !!T.description,
                              helperText:
                                null === T ||
                                void 0 === T ||
                                null === (i = T.description) ||
                                void 0 === i
                                  ? void 0
                                  : i.message
                            }),
                            Object(a.jsx)(Se.a, {
                              control: w,
                              name: 'tags',
                              render: function (e) {
                                var t,
                                  n = e.onChange,
                                  s = e.value
                                return Object(a.jsx)(Ge, {
                                  value: s,
                                  onChange: function (e) {
                                    n(e)
                                  },
                                  error: !!(null === T || void 0 === T
                                    ? void 0
                                    : T.tags),
                                  helperText:
                                    null === T ||
                                    void 0 === T ||
                                    null === (t = T.tags) ||
                                    void 0 === t
                                      ? void 0
                                      : t.message,
                                  disabled: !g
                                })
                              }
                            }),
                            Object(a.jsx)(qe, {
                              inputRef: C,
                              label: 'Additional Notes',
                              name: 'additionalNotes',
                              disabled: !g,
                              error: !!T.additionalNotes,
                              helperText:
                                null === T ||
                                void 0 === T ||
                                null === (l = T.additionalNotes) ||
                                void 0 === l
                                  ? void 0
                                  : l.message
                            }),
                            Object(a.jsx)(Je, {
                              control: w,
                              error: !!T.targetCourses,
                              helperText:
                                null === T ||
                                void 0 === T ||
                                null === (d = T.targetCourses) ||
                                void 0 === d
                                  ? void 0
                                  : d.message,
                              disabled: !g
                            })
                          ]
                        }),
                    g &&
                      Object(a.jsx)(ye, {
                        disabled: m,
                        children: 'Save Changes'
                      })
                  ]
                })
              }),
              Object(a.jsx)(ce.a, {
                children: g
                  ? Object(a.jsx)(a.Fragment, {
                      children:
                        m &&
                        Object(a.jsx)(_e.a, {
                          size: 24,
                          className: j.buttonProgress
                        })
                    })
                  : null
              })
            ]
          })
        }
      Qe.defaultProps = {
        topic: {},
        dialogOpen: !1,
        setDialogOpen: function () {},
        refresh: function () {}
      }
      var Xe = Qe,
        $e = function (e) {
          return Object(a.jsxs)($.a, {
            open: e.open,
            'aria-labelledby': 'form-dialog-title',
            children: [
              Object(a.jsx)(ee.a, {
                id: 'form-dialog-title',
                children: 'Submit Topic Suggestions'
              }),
              Object(a.jsxs)(te.a, {
                children: [
                  Object(a.jsxs)(ne.a, {
                    children: [
                      'Are you sure you want to submit your topic suggestions?',
                      Object(a.jsx)('br', {}),
                      Object(a.jsx)('b', {
                        children: 'This can not be reverted'
                      })
                    ]
                  }),
                  Object(a.jsx)(ae.a, {
                    control: Object(a.jsx)(se.a, {
                      checked: e.checked,
                      onChange: function (t) {
                        return e.setChecked(t.target.checked)
                      }
                    }),
                    label: 'I understand'
                  })
                ]
              }),
              Object(a.jsxs)(ce.a, {
                children: [
                  Object(a.jsx)(oe.a, {
                    onClick: function () {
                      return e.setOpen(!1)
                    },
                    color: 'primary',
                    children: 'Cancel'
                  }),
                  Object(a.jsx)(oe.a, {
                    onClick: function () {
                      e.setOpen(!1), e.proceed()
                    },
                    color: 'primary',
                    disabled: !e.checked,
                    children: 'Proceed'
                  })
                ]
              })
            ]
          })
        }
      function et(e) {
        var t = Object(s.useState)([]),
          n = Object(h.a)(t, 2),
          c = n[0],
          o = n[1],
          r = Object(s.useState)(!1),
          l = Object(h.a)(r, 2),
          d = l[0],
          j = l[1],
          b = Object(s.useState)(!0),
          O = Object(h.a)(b, 2),
          g = O[0],
          x = O[1],
          f = Object(s.useState)(!1),
          v = Object(h.a)(f, 2),
          m = v[0],
          y = v[1],
          S = Object(s.useState)(null),
          C = Object(h.a)(S, 2),
          T = C[0],
          w = C[1],
          A = Object(s.useState)(!1),
          _ = Object(h.a)(A, 2),
          N = _[0],
          R = _[1],
          E = Object(s.useState)(!1),
          I = Object(h.a)(E, 2),
          D = I[0],
          M = I[1],
          L = Object(s.useState)(!1),
          U = Object(h.a)(L, 2),
          F = U[0],
          B = U[1],
          q = Object(s.useState)(!1),
          V = Object(h.a)(q, 2),
          z = V[0],
          H = V[1],
          G = Object(s.useContext)(P).currentPhase,
          Y = Object(p.f)()
        Object(s.useEffect)(function () {
          Z(),
            W.get('/me/studentProjectAvailibility')
              .then(function (e) {
                console.log(e), j(e.data.topic)
              })
              .catch(function (e) {
                console.log(e)
              })
        }, [])
        var Z = function () {
            W.get('/topic/me')
              .then(function (e) {
                console.log(e)
                var t = [],
                  n = !1,
                  a = !1
                e.data.topics.forEach(function (e) {
                  'regular' === e.type
                    ? t.push(e)
                    : 'studentTopic' === e.type && 'archived' !== e.status
                    ? (n = e)
                    : (console.error('Unknown topic type'), console.log(e)),
                    'suggestion' === e.status && (a = !0)
                }),
                  H(a),
                  o(t),
                  j(n),
                  T &&
                    w(
                      e.data.topics.filter(function (e) {
                        return e._id === T._id
                      })[0]
                    )
              })
              .catch(function (e) {
                console.log(e)
              })
              .finally(function () {
                x(!1)
              })
          },
          K = function (e) {
            console.log(e), w(e), y(!0)
          }
        return g
          ? Object(a.jsx)(J.a, { children: 'Loading ...' })
          : F
          ? Object(a.jsx)(J.a, { children: 'Submitting Topics ...' })
          : Object(a.jsxs)(a.Fragment, {
              children: [
                T
                  ? Object(a.jsx)(
                      Xe,
                      { dialogOpen: m, setDialogOpen: y, topic: T, refresh: Z },
                      T._id
                    )
                  : null,
                Object(a.jsx)($e, {
                  open: N,
                  setOpen: R,
                  checked: D,
                  setChecked: M,
                  proceed: function () {
                    D &&
                      (console.log('Submit topics'),
                      B(!0),
                      W.post('/topic/submit')
                        .then(function (e) {
                          console.log(e)
                        })
                        .catch(function (e) {
                          return console.log(e)
                        })
                        .finally(function () {
                          B(!1), Z()
                        }))
                  }
                }),
                Object(a.jsxs)(re.a, {
                  maxWidth: 'lg',
                  children: [
                    Object(a.jsxs)(k, {
                      I: 'takeActionPhaseTwo',
                      this: G,
                      children: [
                        Object(a.jsx)(J.a, {
                          children:
                            'Do you want to be available to supervise student defined projects? (Custom Student Projects)'
                        }),
                        Object(a.jsx)(ae.a, {
                          control: Object(a.jsx)(ie.a, {
                            checked: d,
                            onChange: function (e) {
                              var t = { active: e.target.checked }
                              console.log(t),
                                W.post(
                                  '/supervisor/me/studentProjectAvailibility',
                                  t
                                )
                                  .then(function (e) {
                                    Z()
                                  })
                                  .catch(function (e) {
                                    return console.log(e)
                                  })
                                  .finally(function () {})
                            }
                          }),
                          label: 'Supervise Student Defined Projects'
                        })
                      ]
                    }),
                    Object(a.jsx)(le.a, {
                      component: de.a,
                      style: { margin: '20px 0' },
                      children: Object(a.jsxs)(ue.a, {
                        style: { minWidth: '650px' },
                        size: 'small',
                        children: [
                          Object(a.jsx)(je.a, {
                            children: Object(a.jsxs)(be.a, {
                              children: [
                                Object(a.jsx)(he.a, { children: 'Title' }),
                                Object(a.jsx)(he.a, {
                                  align: 'center',
                                  children: 'Status'
                                }),
                                Object(a.jsx)(he.a, {
                                  align: 'right',
                                  children:
                                    4 === G.phase ? 'Proposals' : 'Actions'
                                })
                              ]
                            })
                          }),
                          Object(a.jsxs)(pe.a, {
                            children: [
                              0 === c.length
                                ? Object(a.jsx)(be.a, {
                                    children: Object(a.jsx)(he.a, {
                                      component: 'th',
                                      scope: 'row',
                                      align: 'center',
                                      colSpan: 3,
                                      children: Object(a.jsx)(J.a, {
                                        children: 'No Topics to display'
                                      })
                                    })
                                  })
                                : c.map(function (e) {
                                    return Object(a.jsxs)(
                                      be.a,
                                      {
                                        children: [
                                          Object(a.jsx)(he.a, {
                                            component: 'th',
                                            scope: 'row',
                                            children: Object(a.jsx)(Oe.a, {
                                              onClick: function () {
                                                return K(e)
                                              },
                                              children: e.title
                                            })
                                          }),
                                          Object(a.jsx)(he.a, {
                                            align: 'center',
                                            children: xe(e.status)
                                          }),
                                          4 === G.phase
                                            ? Object(a.jsx)(he.a, {
                                                align: 'right',
                                                children: Object(a.jsx)(k, {
                                                  I: 'takeActionPhaseFour',
                                                  this: G,
                                                  children: Object(a.jsx)(i.b, {
                                                    to: '/topic/'.concat(e._id),
                                                    children: '6 Submissions'
                                                  })
                                                })
                                              })
                                            : Object(a.jsx)(he.a, {
                                                align: 'right',
                                                children: Object(a.jsx)(oe.a, {
                                                  variant: 'contained',
                                                  children: 'Next Step'
                                                })
                                              })
                                        ]
                                      },
                                      e._id
                                    )
                                  }),
                              d
                                ? Object(a.jsxs)(
                                    be.a,
                                    {
                                      children: [
                                        Object(a.jsx)(he.a, {
                                          component: 'th',
                                          scope: 'row',
                                          children: Object(a.jsx)(Oe.a, {
                                            onClick: function () {
                                              return K(d)
                                            },
                                            children: d.title
                                          })
                                        }),
                                        Object(a.jsx)(he.a, {
                                          align: 'center',
                                          children: xe(d.status)
                                        }),
                                        Object(a.jsx)(he.a, {
                                          align: 'right',
                                          children: Object(a.jsx)(k, {
                                            I: 'takeActionPhaseFour',
                                            this: G,
                                            children: Object(a.jsx)(i.b, {
                                              to: '/topic/'.concat(d._id),
                                              children: '6 Submissions'
                                            })
                                          })
                                        })
                                      ]
                                    },
                                    d._id
                                  )
                                : null
                            ]
                          })
                        ]
                      })
                    }),
                    Object(a.jsx)(k, {
                      I: 'takeActionPhaseTwo',
                      this: G,
                      children: Object(a.jsxs)('div', {
                        style: { display: 'flex', flexDirection: 'row' },
                        children: [
                          Object(a.jsx)(ye, {
                            type: 'button',
                            onClick: function () {
                              return Y.push('/topics/add')
                            },
                            variant: 'outlined',
                            style: { flex: 1, flexGrow: 4 },
                            children: 'Add new Topic Suggestion'
                          }),
                          Object(a.jsx)(ye, {
                            disabled: !z,
                            onClick: function (e) {
                              var t,
                                n = !1,
                                a = Object(u.a)(c)
                              try {
                                for (a.s(); !(t = a.n()).done; ) {
                                  if ('suggestion' === t.value.status) {
                                    n = !0
                                    break
                                  }
                                }
                              } catch (s) {
                                a.e(s)
                              } finally {
                                a.f()
                              }
                              n
                                ? R(!0)
                                : alert(
                                    'You must have at least one topic marked as "Ready for Submision" before you submit your topics'
                                  )
                            },
                            style: { flex: 1, flexGrow: 4 },
                            children: 'Submit Suggestions'
                          })
                        ]
                      })
                    }),
                    Object(a.jsx)(J.a, { children: 'Editing a Topic' }),
                    Object(a.jsx)(J.a, {
                      variant: 'paragraph',
                      children:
                        'To edit a topic click on the `Topic Title` link on the table above. A popup should be displayed containing all the Topic information. Click the `Edit (Pencil)` icon in the top left to begin editing. Make any necessary changes to the topic, then click the `Save Changes` button at the bottom of the popup. To close the popup click the `Exit (X)` icon in the top left.'
                    }),
                    Object(a.jsx)(J.a, { children: 'Viewing Topic proposals' }),
                    Object(a.jsxs)(J.a, {
                      variant: 'paragraph',
                      children: [
                        '*Note: Viewing topic proposals will only become available during phase 4. ',
                        Object(a.jsx)('br', {}),
                        Object(a.jsx)(i.b, {
                          to: '/help/phases',
                          children: 'What are Phases?'
                        }),
                        Object(a.jsx)('br', {}),
                        'To view all proposals students have sent to your topics, click on the link below the `Proposals` on the above table.'
                      ]
                    })
                  ]
                })
              ]
            })
      }
      var tt = n(17),
        nt = n(492),
        at = { tags: [], supervisor: 'unspecified', topicType: 'all' }
      function st(e) {
        var t = Object(s.useState)([]),
          n = Object(h.a)(t, 2),
          c = n[0],
          o = n[1],
          r = Object(s.useState)(!0),
          l = Object(h.a)(r, 2),
          d = l[0],
          u = l[1],
          j = Object(s.useState)([]),
          b = Object(h.a)(j, 2),
          p = b[0],
          O = b[1],
          g = Object(Se.c)({ reValidateMode: 'onChange', defaultValues: at }),
          x = g.handleSubmit,
          f = g.errors,
          v = g.control
        Object(s.useEffect)(function () {
          W.post('/topic/search')
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
            W.get('/supervisor/list')
              .then(function (e) {
                console.log(e), O(e.data.supervisors)
              })
              .catch(function (e) {
                console.log(e)
              })
              .finally(function () {})
        }, [])
        return Object(a.jsxs)(re.a, {
          maxWidth: 'lg',
          children: [
            Object(a.jsx)(J.a, {
              variant: 'h3',
              component: 'h1',
              children: 'Topic List'
            }),
            Object(a.jsxs)('form', {
              onSubmit: x(function (e) {
                console.log(e)
                var t = { tags: null, supervisor: null, topicType: null }
                e.tags.length > 0 && (t.tags = Object(tt.a)(e.tags)),
                  'unspecified' !== e.supervisor &&
                    (t.supervisor = e.supervisor),
                  (t.topicType = e.topicType),
                  console.log('Querying DB for', t),
                  W.post('/topic/search', t)
                    .then(function (e) {
                      console.log(e), o(e.data.topics)
                    })
                    .catch(function (e) {
                      console.log(e)
                    })
              }),
              children: [
                Object(a.jsx)(Se.a, {
                  control: v,
                  name: 'tags',
                  render: function (e) {
                    var t,
                      n = e.onChange,
                      s = e.value
                    return Object(a.jsx)(Ge, {
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
                Object(a.jsxs)(we.a, {
                  variant: 'outlined',
                  children: [
                    Object(a.jsx)('label', { children: 'Supervisor' }),
                    Object(a.jsx)(Se.a, {
                      render: function (e) {
                        var t = e.onChange,
                          n = e.value
                        return Object(a.jsxs)(Ae.a, {
                          value: n,
                          onChange: t,
                          children: [
                            Object(a.jsx)(
                              ke.a,
                              {
                                value: 'unspecified',
                                selected: !0,
                                children: 'None'
                              },
                              'unspecified'
                            ),
                            p.map(function (e) {
                              return Object(a.jsx)(
                                ke.a,
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
                Object(a.jsxs)(we.a, {
                  variant: 'outlined',
                  children: [
                    Object(a.jsx)('label', { children: 'Topic Type' }),
                    Object(a.jsx)(Se.a, {
                      render: function (e) {
                        var t = e.onChange,
                          n = e.value
                        return Object(a.jsxs)(Ae.a, {
                          value: n,
                          onChange: t,
                          children: [
                            Object(a.jsx)(
                              ke.a,
                              { value: 'all', selected: !0, children: 'All' },
                              'all'
                            ),
                            Object(a.jsx)(
                              ke.a,
                              {
                                value: 'regular',
                                children: 'Supervisor Defined'
                              },
                              'regular'
                            ),
                            Object(a.jsx)(
                              ke.a,
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
                Object(a.jsx)(ye, { children: 'Search' })
              ]
            }),
            Object(a.jsx)(le.a, {
              component: de.a,
              style: { margin: '20px 0' },
              children: Object(a.jsxs)(ue.a, {
                style: { minWidth: '650px' },
                size: 'medium',
                children: [
                  Object(a.jsx)(je.a, {
                    children: Object(a.jsx)(be.a, {
                      children: Object(a.jsx)(he.a, {
                        colSpan: 5,
                        children: 'Found '.concat(c.length, ' matching topics')
                      })
                    })
                  }),
                  Object(a.jsx)(pe.a, {
                    children:
                      0 === c.length
                        ? Object(a.jsx)(be.a, {
                            children: Object(a.jsx)(he.a, {
                              component: 'th',
                              scope: 'row',
                              align: 'center',
                              colSpan: 3,
                              children: Object(a.jsx)(J.a, {
                                children: d
                                  ? 'Loading Topics ...'
                                  : 'No Topics to display'
                              })
                            })
                          })
                        : c.map(function (e) {
                            return Object(a.jsxs)(
                              be.a,
                              {
                                children: [
                                  Object(a.jsx)(he.a, {
                                    component: 'th',
                                    scope: 'row',
                                    children: Object(a.jsx)(i.b, {
                                      to: './topics/view/' + e.code,
                                      children: Object(a.jsx)(Oe.a, {
                                        component: 'p',
                                        children: e.title
                                      })
                                    })
                                  }),
                                  Object(a.jsxs)(he.a, {
                                    align: 'center',
                                    children: [
                                      e.supervisor.displayName,
                                      ' - ',
                                      e.supervisor.abbr
                                    ]
                                  }),
                                  Object(a.jsx)(he.a, {
                                    align: 'center',
                                    children: e.code
                                  }),
                                  Object(a.jsx)(he.a, {
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
                                            nt.a,
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
                                              nt.a,
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
                                  Object(a.jsxs)(he.a, {
                                    align: 'right',
                                    children: [
                                      e.proposalCount,
                                      ' Students have shown interest'
                                    ]
                                  })
                                ]
                              },
                              e.code
                            )
                          })
                  })
                ]
              })
            })
          ]
        })
      }
      var ct = function (e) {
          var t,
            n,
            s,
            c,
            o = Object(Se.c)({
              resolver: Object(Ie.yupResolver)(Ue),
              reValidateMode: 'onChange',
              defaultValues: Me
            }),
            r = o.register,
            i = o.handleSubmit,
            l = o.errors,
            d = o.control
          return Object(a.jsxs)(re.a, {
            component: 'main',
            maxWidth: 'md',
            children: [
              Object(a.jsx)(J.a, {
                component: 'h1',
                variant: 'h4',
                align: 'center',
                children: 'Create new Topic'
              }),
              Object(a.jsxs)('form', {
                onSubmit: i(function (e) {
                  console.log(e),
                    W.post('/topic/add', e)
                      .then(function (e) {
                        console.log(e),
                          alert('Topic has been sucessfully added')
                      })
                      .catch(function (e) {
                        return console.log(e)
                      })
                }),
                autoComplete: 'off',
                children: [
                  Object(a.jsx)(Be, {
                    inputRef: r,
                    type: 'text',
                    name: 'title',
                    label: 'Title',
                    error: !!l.title,
                    helperText:
                      null === l ||
                      void 0 === l ||
                      null === (t = l.title) ||
                      void 0 === t
                        ? void 0
                        : t.message
                  }),
                  Object(a.jsx)(qe, {
                    inputRef: r,
                    type: 'text',
                    name: 'description',
                    label: 'Description',
                    error: !!l.description,
                    helperText:
                      null === l ||
                      void 0 === l ||
                      null === (n = l.description) ||
                      void 0 === n
                        ? void 0
                        : n.message
                  }),
                  Object(a.jsx)(Se.a, {
                    control: d,
                    name: 'tags',
                    render: function (e) {
                      var t,
                        n = e.onChange,
                        s = e.value
                      return Object(a.jsx)(Ge, {
                        value: s,
                        onChange: function (e) {
                          n(e)
                        },
                        error: !!(null === l || void 0 === l ? void 0 : l.tags),
                        helperText:
                          null === l ||
                          void 0 === l ||
                          null === (t = l.tags) ||
                          void 0 === t
                            ? void 0
                            : t.message
                      })
                    }
                  }),
                  Object(a.jsx)(qe, {
                    inputRef: r,
                    type: 'text',
                    name: 'additionalNotes',
                    label: 'Additional Notes (Optional)',
                    error: !!l.additionalNotes,
                    helperText:
                      null === l ||
                      void 0 === l ||
                      null === (s = l.additionalNotes) ||
                      void 0 === s
                        ? void 0
                        : s.message
                  }),
                  Object(a.jsx)(Je, {
                    control: d,
                    label: 'Target Courses (Optional)',
                    error: !!l.targetCourses,
                    helperText:
                      null === l ||
                      void 0 === l ||
                      null === (c = l.targetCourses) ||
                      void 0 === c
                        ? void 0
                        : c.message
                  }),
                  Object(a.jsx)(ye, { children: 'Add Topic' })
                ]
              })
            ]
          })
        },
        ot = Object(ve.a)(function (e) {
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
        rt = function (e) {
          var t = Object(s.useState)({
              days: ' - ',
              hours: ' - ',
              min: ' - ',
              sec: ' - '
            }),
            n = Object(h.a)(t, 2),
            c = n[0],
            o = n[1],
            r = Object(s.useState)(),
            i = Object(h.a)(r, 2),
            l = i[0],
            d = i[1],
            u = ot()
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
            p = function (e) {
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
                    Object(a.jsx)('strong', { children: p(c.days) }),
                    Object(a.jsx)('span', {
                      children: 1 === c.days ? 'Day' : 'Days'
                    })
                  ]
                })
              }),
              Object(a.jsx)('span', {
                className: u.countdownCol,
                children: Object(a.jsxs)('span', {
                  className: u.countdownColElement,
                  children: [
                    Object(a.jsx)('strong', { children: p(c.hours) }),
                    Object(a.jsx)('span', { children: 'Hours' })
                  ]
                })
              }),
              Object(a.jsx)('span', {
                className: u.countdownCol,
                children: Object(a.jsxs)('span', {
                  className: u.countdownColElement,
                  children: [
                    Object(a.jsx)('strong', { children: p(c.min) }),
                    Object(a.jsx)('span', { children: 'Min' })
                  ]
                })
              }),
              Object(a.jsx)('span', {
                className: u.countdownCol,
                children: Object(a.jsxs)('span', {
                  className: u.countdownColElement,
                  children: [
                    Object(a.jsx)('strong', { children: p(c.sec) }),
                    Object(a.jsx)('span', { children: 'Sec' })
                  ]
                })
              })
            ]
          })
        }
      rt.defaultProps = { date: new Date() }
      var it = rt,
        lt = {
          1: ['Supervisors assigned to system', 'Students assigned to system'],
          2: ['Topic suggestions drafting'],
          3: ['TopicList available to be viewed', 'Student proposal drafting'],
          4: [
            'Student proposal submission',
            'Supervisors can respond to proposals'
          ]
        }
      var dt = function () {
        var e = Object(s.useContext)(P).currentPhase
        return (
          console.log(e),
          Object(a.jsxs)(re.a, {
            maxWidth: 'lg',
            children: [
              Object(a.jsxs)(J.a, {
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
              Object(a.jsx)(it, { date: e.endDate.toString() }),
              Object(a.jsx)(J.a, {
                style: { fontSize: '35px' },
                align: 'center',
                children: 'until next phase'
              }),
              Object(a.jsx)('ul', {
                children: lt[e.phase].map(function (e) {
                  return Object(a.jsx)('li', { children: e }, e)
                })
              }),
              e.phase < 4
                ? Object(a.jsxs)(a.Fragment, {
                    children: [
                      Object(a.jsx)(J.a, {
                        align: 'center',
                        children: 'Actions available in next phase'
                      }),
                      Object(a.jsx)('ul', {
                        children: lt[e.phase + 1].map(function (e) {
                          return Object(a.jsx)('li', { children: e }, e)
                        })
                      })
                    ]
                  })
                : null
            ]
          })
        )
      }
      function ut(e) {
        return Object(a.jsx)(ye, {
          disabled: e.disabled,
          onClick: e.onUpload,
          children: 'Upload All'
        })
      }
      var jt = n(238),
        bt = c.a.createRef(),
        ht = { header: !0 }
      function pt(e) {
        var t = function (e) {
            bt.current && bt.current.open(e)
          },
          n = function (e) {
            bt.current && bt.current.removeFile(e)
          }
        return Object(a.jsx)(a.Fragment, {
          children: Object(a.jsx)(jt.a, {
            config: ht,
            ref: bt,
            onFileLoad: function (t) {
              console.log(t)
              var n,
                a = [],
                s = Object(u.a)(t)
              try {
                for (s.s(); !(n = s.n()).done; ) {
                  var c = n.value.data.StudentEmail
                  c && '' !== c
                    ? (console.log(c), a.push(c))
                    : console.log(c, 'is being skipped')
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
                  Object(a.jsx)(oe.a, {
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
                  Object(a.jsx)(oe.a, {
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
      var Ot = n(254),
        gt = n(476),
        xt = n(418),
        ft = n(477),
        vt = Object(xt.a)(function (e) {
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
      function mt(e) {
        var t = vt()
        return Object(a.jsxs)(de.a, {
          component: 'form',
          className: t.root,
          children: [
            Object(a.jsx)(Ot.a, {
              className: t.input,
              placeholder: 'Student Email',
              value: e.email,
              inputProps: { 'aria-label': 'Student Email' },
              endAdornment: e.endAdornment,
              onChange: e.onChange
            }),
            Object(a.jsx)(gt.a, {
              title: 'Include @studentmail prefix',
              'aria-label': 'Include @studentmail prefix',
              children: Object(a.jsx)(se.a, {
                edge: 'start',
                disableRipple: !0,
                checked: e.includeEmailPrefix,
                onChange: e.onChangeEmailPrefix
              })
            }),
            Object(a.jsx)(Te.a, {
              className: t.divider,
              orientation: 'vertical'
            }),
            Object(a.jsx)(Pe.a, {
              className: t.iconButton,
              'aria-label': 'search',
              onClick: e.onAdd,
              children: Object(a.jsx)(ft.a, {})
            })
          ]
        })
      }
      var yt = n(110),
        St = n.n(yt),
        Ct = n(111),
        Pt = n.n(Ct),
        Tt = n(478),
        wt = n(499),
        At = n(156),
        kt = n.n(At),
        _t = Object(ve.a)(function (e) {
          return {
            root: { flexShrink: 0, marginLeft: e.spacing(2.5) },
            assigned: { color: 'green' },
            not_found: { color: 'red' },
            exists: { color: 'orange' },
            no_assignment: { color: 'red' }
          }
        })
      function Nt(e) {
        var t = _t(),
          n = e.count,
          s = e.page,
          c = e.rowsPerPage,
          o = e.onChangePage
        return Object(a.jsxs)('div', {
          className: t.root,
          children: [
            Object(a.jsx)(Pe.a, {
              onClick: function (e) {
                o(e, s - 1)
              },
              disabled: 0 === s,
              'aria-label': 'previous page',
              children: Object(a.jsx)(St.a, {})
            }),
            Object(a.jsx)(Pe.a, {
              onClick: function (e) {
                o(e, s + 1)
              },
              disabled: s >= Math.ceil(n / c) - 1,
              'aria-label': 'next page',
              children: Object(a.jsx)(Pt.a, {})
            })
          ]
        })
      }
      var Rt = {
          exists: 'Exists: This user is already assigned this role',
          not_found:
            'Not Found: Email could not be linked to an active user account',
          assigned: 'The role was sucessfully assigned to this user'
        },
        Et = function (e) {
          var t = Object(s.useState)(e.value),
            n = Object(h.a)(t, 2),
            c = n[0],
            o = n[1],
            r = Object(s.useState)(0),
            i = Object(h.a)(r, 2),
            l = i[0],
            d = i[1],
            u = Object(s.useState)(5),
            j = Object(h.a)(u, 2),
            b = j[0],
            p = j[1]
          Object(s.useEffect)(
            function () {
              o(e.value)
            },
            [e.value]
          )
          var O = _t()
          return Object(a.jsx)(le.a, {
            component: de.a,
            children: Object(a.jsxs)(ue.a, {
              'aria-label': 'simple table',
              children: [
                Object(a.jsx)(je.a, {
                  children: Object(a.jsxs)(be.a, {
                    children: [
                      Object(a.jsx)(he.a, { children: 'Email' }),
                      e.removableEntries
                        ? Object(a.jsx)(he.a, {
                            align: 'right',
                            children: 'Actions'
                          })
                        : null
                    ]
                  })
                }),
                Object(a.jsx)(pe.a, {
                  children:
                    0 === c.length
                      ? Object(a.jsx)(be.a, {
                          children: Object(a.jsx)(he.a, {
                            colspan: e.removableEntries ? 2 : 1,
                            children: 'No Users to display'
                          })
                        })
                      : (b > 0 ? c.slice(l * b, l * b + b) : c).map(function (
                          t
                        ) {
                          return Object(a.jsxs)(
                            be.a,
                            {
                              children: [
                                Object(a.jsx)(gt.a, {
                                  title: (
                                    null === t || void 0 === t
                                      ? void 0
                                      : t.status
                                  )
                                    ? Rt[t.status]
                                    : t.email,
                                  children: Object(a.jsx)(he.a, {
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
                                  ? Object(a.jsx)(he.a, {
                                      align: 'right',
                                      children: Object(a.jsx)(oe.a, {
                                        variant: 'outlined',
                                        color: 'secondary',
                                        startIcon: Object(a.jsx)(kt.a, {}),
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
                Object(a.jsx)(Tt.a, {
                  children: Object(a.jsx)(be.a, {
                    children: Object(a.jsx)(wt.a, {
                      rowsPerPageOptions: [
                        5,
                        10,
                        25,
                        { label: 'All', value: -1 }
                      ],
                      colSpan: 3,
                      count: c.length,
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
                        p(parseInt(e.target.value, 10)), d(0)
                      },
                      ActionsComponent: Nt
                    })
                  })
                })
              ]
            })
          })
        },
        It = n(241),
        Dt = n.n(It),
        Mt = n(240),
        Lt = n.n(Mt),
        Ut = Object(ve.a)(function (e) {
          return { button: { margin: e.spacing(1) } }
        }),
        Wt = function (e) {
          var t = Ut(),
            n = Object(p.f)()
          return e.dense
            ? Object(a.jsx)(
                Pe.a,
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
                  { children: Object(a.jsx)(Lt.a, {}) }
                )
              )
            : Object(a.jsx)(
                oe.a,
                Object(b.a)(
                  Object(b.a)(
                    {
                      variant: 'contained',
                      color: 'primary',
                      className: t.button,
                      startIcon: Object(a.jsx)(Dt.a, {}),
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
      Wt.defaultProps = { dense: !1 }
      var Ft = Wt,
        Bt = n(496),
        qt = n(480),
        Vt = n(242),
        zt = n.n(Vt),
        Ht = function (e) {
          return Object(a.jsx)(qt.a, {
            in: e.open,
            children: Object(a.jsx)(Bt.a, {
              severity: e.severity,
              action: Object(a.jsx)(Pe.a, {
                'aria-label': 'close',
                color: 'inherit',
                size: 'small',
                onClick: function () {
                  e.setOpen(!1)
                },
                children: Object(a.jsx)(zt.a, { fontSize: 'inherit' })
              }),
              children: e.message
            })
          })
        }
      Ht.defaultProps = {
        open: !1,
        setOpen: function () {},
        message: 'No Message Supplied',
        severity: 'error'
      }
      var Gt = Ht,
        Yt = function (e) {
          var t = Object(s.useState)(''),
            n = Object(h.a)(t, 2),
            c = n[0],
            o = n[1],
            r = Object(s.useState)([]),
            i = Object(h.a)(r, 2),
            l = i[0],
            b = i[1],
            p = Object(s.useState)(!0),
            O = Object(h.a)(p, 2),
            g = O[0],
            x = O[1],
            f = Object(s.useState)({}),
            v = Object(h.a)(f, 2),
            m = v[0],
            y = v[1],
            S = Object(s.useState)(!1),
            C = Object(h.a)(S, 2),
            P = C[0],
            T = C[1],
            w = (function () {
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
                            W.post('/student/assign', n)
                              .then(function (e) {
                                if (
                                  (console.log(e.data),
                                  e.data.students.length > 0)
                                ) {
                                  var t,
                                    n = Object(tt.a)(l),
                                    a = l.map(function (e) {
                                      return e.email
                                    }),
                                    s = Object(u.a)(e.data.students)
                                  try {
                                    for (s.s(); !(t = s.n()).done; ) {
                                      var c = t.value,
                                        o = a.indexOf(c.email)
                                      o < 0 || (n[o].status = c.status)
                                    }
                                  } catch (i) {
                                    s.e(i)
                                  } finally {
                                    s.f()
                                  }
                                  var r = n.filter(function (e) {
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
                                    console.log(r),
                                    r.length > 0
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
                                    b(r)
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
                        case 5:
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
            A = g
              ? Object(a.jsx)('span', {
                  style: { fontSize: '10px', color: 'gray', marginRight: 10 },
                  children: '@studentmail.ul.ie'
                })
              : ''
          return Object(a.jsxs)(re.a, {
            maxWidth: 'lg',
            children: [
              Object(a.jsx)(Ft, {}),
              Object(a.jsx)(J.a, {
                variant: 'h6',
                children: 'Upload CSV file'
              }),
              Object(a.jsx)(pt, {
                onAdd: function (e) {
                  var t = Object(tt.a)(l)
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
                  } catch (c) {
                    a.e(c)
                  } finally {
                    a.f()
                  }
                  b(t)
                }
              }),
              Object(a.jsx)('br', {}),
              Object(a.jsx)(Te.a, {}),
              Object(a.jsx)('br', {}),
              Object(a.jsx)(J.a, {
                variant: 'h6',
                children: 'Add Individual Student'
              }),
              Object(a.jsx)(mt, {
                email: c,
                endAdornment: A,
                onChange: function (e) {
                  o(e.target.value)
                },
                includeEmailPrefix: g,
                onChangeEmailPrefix: function (e) {
                  x(e.target.checked)
                },
                onAdd: function (e) {
                  if (0 === c.length)
                    return (
                      y({
                        message: 'Cannot add empty email!',
                        severity: 'warning'
                      }),
                      void T(!0)
                    )
                  if (
                    l.filter(function (e) {
                      return e.email === c
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
                      -1 === c.indexOf('@') && g ? '@studentmail.ul.ie' : '',
                    n = c.trim() + t
                  if (!/\S+@\S+\.\S+/.test(n))
                    return (
                      y({
                        message: 'Cannot add invalid email!',
                        severity: 'warning'
                      }),
                      void T(!0)
                    )
                  var a = Object(tt.a)(l)
                  a.push({ email: n }), o(''), b(a)
                }
              }),
              Object(a.jsx)('br', {}),
              Object(a.jsx)(Gt, {
                open: P,
                setOpen: T,
                message: m.message,
                severity: m.severity
              }),
              Object(a.jsx)('br', {}),
              Object(a.jsx)(Et, {
                value: l,
                removableEntries: !0,
                removeEntry: function (e) {
                  var t = l.filter(function (t) {
                    return t.email !== e
                  })
                  b(t)
                }
              }),
              Object(a.jsx)(ut, { disabled: !l.length, onUpload: w }),
              Object(a.jsx)(ye, {
                type: 'text',
                color: 'secondary',
                onClick: function () {
                  b([]), T(!1)
                },
                children: 'Clear Student List'
              })
            ]
          })
        },
        Zt = n(481),
        Jt = Object(ve.a)(function (e) {
          return { root: { flexShrink: 0, marginLeft: e.spacing(2.5) } }
        })
      var Kt = function (e) {
          var t = Jt(),
            n = e.count,
            s = e.page,
            c = e.rowsPerPage,
            o = e.onChangePage
          return Object(a.jsxs)('div', {
            className: t.root,
            children: [
              Object(a.jsx)(Pe.a, {
                onClick: function (e) {
                  o(e, s - 1)
                },
                disabled: 0 === s,
                'aria-label': 'previous page',
                children: Object(a.jsx)(St.a, {})
              }),
              Object(a.jsx)(Pe.a, {
                onClick: function (e) {
                  o(e, s + 1)
                },
                disabled: s >= Math.ceil(n / c) - 1,
                'aria-label': 'next page',
                children: Object(a.jsx)(Pt.a, {})
              })
            ]
          })
        },
        Qt = function (e) {
          var t = Object(s.useState)([]),
            n = Object(h.a)(t, 2),
            c = n[0],
            o = n[1],
            r = Object(s.useState)([]),
            l = Object(h.a)(r, 2),
            d = l[0],
            u = l[1],
            j = Object(s.useState)([]),
            b = Object(h.a)(j, 2),
            p = b[0],
            O = b[1],
            g = Object(s.useState)(0),
            x = Object(h.a)(g, 2),
            f = x[0],
            v = x[1],
            m = Object(s.useState)(5),
            y = Object(h.a)(m, 2),
            S = y[0],
            C = y[1],
            P = Object(s.useState)(!0),
            T = Object(h.a)(P, 2),
            w = T[0],
            A = T[1],
            k = Object(s.useState)({}),
            _ = Object(h.a)(k, 2),
            N = _[0],
            R = _[1],
            E = Object(s.useState)(!1),
            I = Object(h.a)(E, 2),
            D = I[0],
            M = I[1]
          Object(s.useEffect)(function () {
            L()
          }, [])
          var L = function () {
            W.get('/student')
              .then(function (e) {
                console.log(e), o(e.data.students), u(e.data.students)
              })
              .catch(function (e) {
                switch (e) {
                  case 'error_retrieving_students':
                    R({
                      message: 'Could not retrieve students from database',
                      severity: 'warning'
                    })
                    break
                  default:
                    R({
                      message: 'An error occurred, please try again',
                      severity: 'error'
                    })
                }
                M(!0)
              })
              .finally(function () {
                A(!1)
              })
          }
          return w
            ? Object(a.jsx)('p', { children: 'Loading...' })
            : Object(a.jsxs)(re.a, {
                maxwidth: 'md',
                children: [
                  Object(a.jsx)(i.b, {
                    to: '/student/assign',
                    children: Object(a.jsx)(ye, { children: 'Assign Students' })
                  }),
                  Object(a.jsx)(Be, {
                    label: 'Search',
                    onChange: function (e) {
                      if ('' === e.target.value) return u(c)
                      var t = c.filter(function (t) {
                        return !t.email.indexOf(e.target.value.trim())
                      })
                      u(t)
                    }
                  }),
                  Object(a.jsx)(le.a, {
                    component: de.a,
                    children: Object(a.jsxs)(ue.a, {
                      'aria-label': 'simple table',
                      children: [
                        Object(a.jsx)(je.a, {
                          children: Object(a.jsxs)(be.a, {
                            children: [
                              Object(a.jsxs)(he.a, {
                                children: ['Selected (', p.length, ')']
                              }),
                              Object(a.jsx)(he.a, {
                                align: 'right',
                                children: 'Email'
                              }),
                              Object(a.jsx)(he.a, {
                                align: 'right',
                                children: 'Actions'
                              })
                            ]
                          })
                        }),
                        Object(a.jsx)(pe.a, {
                          children:
                            0 === d.length
                              ? Object(a.jsx)(be.a, {
                                  children: Object(a.jsx)(he.a, {
                                    colSpan: 3,
                                    align: 'center',
                                    children: 'No Students to show'
                                  })
                                })
                              : (S > 0 ? d.slice(f * S, f * S + S) : d).map(
                                  function (e) {
                                    return Object(a.jsxs)(
                                      be.a,
                                      {
                                        children: [
                                          Object(a.jsx)(he.a, {
                                            component: 'th',
                                            scope: 'row',
                                            children: Object(a.jsx)(se.a, {
                                              checked: p.includes(e.id),
                                              onClick: function () {
                                                return (function (e) {
                                                  var t = Object(tt.a)(p)
                                                  t.includes(e)
                                                    ? t.splice(t.indexOf(e), 1)
                                                    : t.push(e),
                                                    O(t)
                                                })(e.id)
                                              }
                                            })
                                          }),
                                          Object(a.jsx)(he.a, {
                                            align: 'right',
                                            children: e.email
                                          }),
                                          Object(a.jsxs)(he.a, {
                                            align: 'right',
                                            children: [
                                              Object(a.jsx)(ye, {
                                                style: {
                                                  width: '25%',
                                                  margin: 0
                                                },
                                                startIcon: Object(a.jsx)(
                                                  Re.a,
                                                  {}
                                                ),
                                                children: 'View'
                                              }),
                                              Object(a.jsx)(ye, {
                                                onClick: function () {
                                                  return (
                                                    (t = e._id),
                                                    console.log(
                                                      'removing student w/ id',
                                                      t
                                                    ),
                                                    void W.post(
                                                      '/student/delete',
                                                      { studentId: t }
                                                    )
                                                      .then(function (e) {
                                                        console.log(e),
                                                          R({
                                                            message:
                                                              'Student sucessfully removed',
                                                            severity: 'success'
                                                          }),
                                                          M(!0),
                                                          L()
                                                      })
                                                      .catch(function (e) {
                                                        switch (
                                                          (console.log(e), e)
                                                        ) {
                                                          case 'error_retrieving_student':
                                                            R({
                                                              message:
                                                                'An error occurred while retrieving the student. Please try again',
                                                              severity:
                                                                'warning'
                                                            })
                                                            break
                                                          case 'student_not_found':
                                                            R({
                                                              message:
                                                                'Could not find the requested student',
                                                              severity:
                                                                'warning'
                                                            }),
                                                              L()
                                                            break
                                                          default:
                                                            R({
                                                              message:
                                                                'An error occurred, please try again',
                                                              severity: 'error'
                                                            })
                                                        }
                                                        M(!0)
                                                      })
                                                  )
                                                  var t
                                                },
                                                style: {
                                                  width: '25%',
                                                  margin: '0 0 0 5px'
                                                },
                                                color: 'secondary',
                                                startIcon: Object(a.jsx)(
                                                  Zt.a,
                                                  {}
                                                ),
                                                children: 'Delete'
                                              })
                                            ]
                                          })
                                        ]
                                      },
                                      e.id
                                    )
                                  }
                                )
                        }),
                        Object(a.jsx)(Tt.a, {
                          children: Object(a.jsx)(be.a, {
                            children: Object(a.jsx)(wt.a, {
                              rowsPerPageOptions: [
                                5,
                                10,
                                25,
                                { label: 'All', value: -1 }
                              ],
                              colSpan: 3,
                              count: d.length,
                              rowsPerPage: S,
                              page: f,
                              SelectProps: {
                                inputProps: { 'aria-label': 'rows per page' },
                                native: !0
                              },
                              onChangePage: function (e, t) {
                                v(t)
                              },
                              onChangeRowsPerPage: function (e) {
                                C(parseInt(e.target.value, 10)), v(0)
                              },
                              ActionsComponent: Kt
                            })
                          })
                        })
                      ]
                    })
                  }),
                  console.log(D),
                  Object(a.jsx)(Gt, {
                    open: D,
                    setOpen: M,
                    message: N.message,
                    severity: N.severity
                  })
                ]
              })
        },
        Xt = function (e) {
          var t = Object(s.useState)(''),
            n = Object(h.a)(t, 2),
            c = n[0],
            o = n[1],
            r = Object(s.useState)([]),
            i = Object(h.a)(r, 2),
            l = i[0],
            b = i[1],
            p = Object(s.useState)(!0),
            O = Object(h.a)(p, 2),
            g = O[0],
            x = O[1],
            f = Object(s.useState)({}),
            v = Object(h.a)(f, 2),
            m = v[0],
            y = v[1],
            S = Object(s.useState)(!1),
            C = Object(h.a)(S, 2),
            P = C[0],
            T = C[1],
            w = (function () {
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
                            W.post('/supervisor/assign', n)
                              .then(function (e) {
                                if (
                                  (console.log(e.data.supervisors),
                                  e.data.supervisors.length > 0)
                                ) {
                                  var t,
                                    n = Object(tt.a)(l),
                                    a = l.map(function (e) {
                                      return e.email
                                    }),
                                    s = Object(u.a)(e.data.supervisors)
                                  try {
                                    for (s.s(); !(t = s.n()).done; ) {
                                      var c = t.value,
                                        o = a.indexOf(c.email)
                                      o < 0 || (n[o].status = c.status)
                                    }
                                  } catch (i) {
                                    s.e(i)
                                  } finally {
                                    s.f()
                                  }
                                  var r = n.filter(function (e) {
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
                                    console.log(r),
                                    r.length > 0
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
                                    b(r)
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
                        case 5:
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
            A = g
              ? Object(a.jsx)('span', {
                  style: { fontSize: '10px', color: 'gray', marginRight: 10 },
                  children: '@ul.ie'
                })
              : ''
          return Object(a.jsxs)(re.a, {
            maxWidth: 'lg',
            children: [
              Object(a.jsx)(Ft, {}),
              Object(a.jsx)(J.a, {
                variant: 'h6',
                children: 'Add Supervisors (CSV File)'
              }),
              Object(a.jsx)(pt, {
                onAdd: function (e) {
                  var t,
                    n = Object(tt.a)(l),
                    a = Object(u.a)(e)
                  try {
                    for (a.s(); !(t = a.n()).done; ) {
                      var s = t.value
                      if (!s || 0 === s.length) return
                      n.push({ id: n.length, email: s })
                    }
                  } catch (c) {
                    a.e(c)
                  } finally {
                    a.f()
                  }
                  b(n)
                }
              }),
              Object(a.jsx)('br', {}),
              Object(a.jsx)(Te.a, {}),
              Object(a.jsx)('br', {}),
              Object(a.jsx)(J.a, {
                variant: 'h6',
                children: 'Add Supervisor by Email'
              }),
              Object(a.jsx)(mt, {
                email: c,
                endAdornment: A,
                onChange: function (e) {
                  o(e.target.value)
                },
                includeEmailPrefix: g,
                onChangeEmailPrefix: function (e) {
                  x(e.target.checked)
                },
                onAdd: function (e) {
                  if (0 === c.length)
                    return (
                      y({
                        message: 'Cannot add empty email!',
                        severity: 'warning'
                      }),
                      void T(!0)
                    )
                  if (
                    l.filter(function (e) {
                      return e.email === c
                    }).length > 0
                  )
                    return (
                      y({
                        message: 'Cannot add duplicate email!',
                        severity: 'warning'
                      }),
                      void T(!0)
                    )
                  var t = -1 === c.indexOf('@') && g ? '@ul.ie' : '',
                    n = c.trim() + t
                  if (!/\S+@\S+\.\S+/.test(n))
                    return (
                      y({
                        message: 'Cannot add invalid email!',
                        severity: 'error'
                      }),
                      void T(!0)
                    )
                  var a = Object(tt.a)(l)
                  a.push({ email: n }), o(''), b(a)
                }
              }),
              Object(a.jsx)(Gt, {
                open: P,
                setOpen: T,
                message: m.message,
                severity: m.severity
              }),
              Object(a.jsx)('br', {}),
              Object(a.jsx)(Et, {
                value: l,
                removableEntries: !0,
                removeEntry: function (e) {
                  var t = l.filter(function (t) {
                    return t.email !== e
                  })
                  b(t)
                }
              }),
              Object(a.jsx)(ut, { disabled: !l.length, onUpload: w }),
              Object(a.jsx)(ye, {
                type: 'text',
                color: 'secondary',
                onClick: function () {
                  b([])
                },
                children: 'Clear Supervisor List'
              })
            ]
          })
        },
        $t = Object(ve.a)(function (e) {
          return { root: { flexShrink: 0, marginLeft: e.spacing(2.5) } }
        })
      function en(e) {
        var t = $t(),
          n = e.count,
          s = e.page,
          c = e.rowsPerPage,
          o = e.onChangePage
        return Object(a.jsxs)('div', {
          className: t.root,
          children: [
            Object(a.jsx)(Pe.a, {
              onClick: function (e) {
                o(e, s - 1)
              },
              disabled: 0 === s,
              'aria-label': 'previous page',
              children: Object(a.jsx)(St.a, {})
            }),
            Object(a.jsx)(Pe.a, {
              onClick: function (e) {
                o(e, s + 1)
              },
              disabled: s >= Math.ceil(n / c) - 1,
              'aria-label': 'next page',
              children: Object(a.jsx)(Pt.a, {})
            })
          ]
        })
      }
      var tn = function (e) {
          var t = Object(s.useState)([]),
            n = Object(h.a)(t, 2),
            c = n[0],
            o = n[1],
            r = Object(s.useState)([]),
            l = Object(h.a)(r, 2),
            d = l[0],
            u = l[1],
            j = Object(s.useState)([]),
            b = Object(h.a)(j, 2),
            p = b[0],
            O = b[1],
            g = Object(s.useState)(0),
            x = Object(h.a)(g, 2),
            f = x[0],
            v = x[1],
            m = Object(s.useState)(5),
            y = Object(h.a)(m, 2),
            S = y[0],
            C = y[1],
            P = Object(s.useState)(!0),
            T = Object(h.a)(P, 2),
            w = T[0],
            A = T[1]
          Object(s.useEffect)(function () {
            k()
          }, [])
          var k = function () {
            W.get('/supervisor')
              .then(function (e) {
                console.log(e), o(e.data.supervisors), u(e.data.supervisors)
              })
              .catch(function (e) {
                console.log(e)
              })
              .finally(function () {
                A(!1)
              })
          }
          return w
            ? Object(a.jsx)('p', { children: 'Loading...' })
            : Object(a.jsxs)(re.a, {
                maxwidth: 'md',
                children: [
                  Object(a.jsx)(i.b, {
                    to: '/supervisor/assign',
                    children: Object(a.jsx)(ye, {
                      children: 'Go to Assign Supervisors Page'
                    })
                  }),
                  Object(a.jsx)(Be, {
                    label: 'Search',
                    onChange: function (e) {
                      if ('' === e.target.value) return u(c)
                      var t = c.filter(function (t) {
                        return !t.email.indexOf(e.target.value.trim())
                      })
                      u(t)
                    }
                  }),
                  Object(a.jsx)(le.a, {
                    component: de.a,
                    children: Object(a.jsxs)(ue.a, {
                      'aria-label': 'simple table',
                      children: [
                        Object(a.jsx)(je.a, {
                          children: Object(a.jsxs)(be.a, {
                            children: [
                              Object(a.jsxs)(he.a, {
                                children: ['Selected (', p.length, ')']
                              }),
                              Object(a.jsx)(he.a, {
                                align: 'right',
                                children: 'Email'
                              }),
                              Object(a.jsx)(he.a, {
                                align: 'right',
                                children: 'Actions'
                              })
                            ]
                          })
                        }),
                        Object(a.jsx)(pe.a, {
                          children:
                            0 === d.length
                              ? Object(a.jsx)(be.a, {
                                  children: Object(a.jsx)(he.a, {
                                    colSpan: 3,
                                    align: 'center',
                                    children: 'No Supervisors to show'
                                  })
                                })
                              : (S > 0 ? d.slice(f * S, f * S + S) : d).map(
                                  function (e) {
                                    return Object(a.jsxs)(
                                      be.a,
                                      {
                                        children: [
                                          Object(a.jsx)(he.a, {
                                            component: 'th',
                                            scope: 'row',
                                            children: Object(a.jsx)(se.a, {
                                              checked: p.includes(e.id),
                                              onClick: function () {
                                                return (function (e) {
                                                  var t = Object(tt.a)(p)
                                                  t.includes(e)
                                                    ? t.splice(t.indexOf(e), 1)
                                                    : t.push(e),
                                                    O(t)
                                                })(e.id)
                                              }
                                            })
                                          }),
                                          Object(a.jsx)(he.a, {
                                            align: 'right',
                                            children: e.email
                                          }),
                                          Object(a.jsx)(he.a, {
                                            align: 'right',
                                            children: Object(a.jsx)(ye, {
                                              onClick: function () {
                                                return (
                                                  (t = e._id),
                                                  console.log(
                                                    'removing supervisor w/ id',
                                                    t
                                                  ),
                                                  void W.post(
                                                    '/supervisor/delete',
                                                    { supervisorId: t }
                                                  )
                                                    .then(function (e) {
                                                      console.log(e), k()
                                                    })
                                                    .catch(function (e) {
                                                      console.log(e)
                                                    })
                                                )
                                                var t
                                              },
                                              style: {
                                                width: '50%',
                                                margin: '0 0 0 5px'
                                              },
                                              color: 'secondary',
                                              startIcon: Object(a.jsx)(
                                                Zt.a,
                                                {}
                                              ),
                                              children: 'Delete'
                                            })
                                          })
                                        ]
                                      },
                                      e.id
                                    )
                                  }
                                )
                        }),
                        Object(a.jsx)(Tt.a, {
                          children: Object(a.jsx)(be.a, {
                            children: Object(a.jsx)(wt.a, {
                              rowsPerPageOptions: [
                                5,
                                10,
                                25,
                                { label: 'All', value: -1 }
                              ],
                              colSpan: 3,
                              count: d.length,
                              rowsPerPage: S,
                              page: f,
                              SelectProps: {
                                inputProps: { 'aria-label': 'rows per page' },
                                native: !0
                              },
                              onChangePage: function (e, t) {
                                v(t)
                              },
                              onChangeRowsPerPage: function (e) {
                                C(parseInt(e.target.value, 10)), v(0)
                              },
                              ActionsComponent: en
                            })
                          })
                        })
                      ]
                    })
                  }),
                  Object(a.jsx)(ye, {
                    disabled: 0 === p.length,
                    onClick: function () {
                      console.log('Removing Supervisors'), console.log(p)
                    },
                    children: 'Remove Selected'
                  })
                ]
              })
        },
        nn = { coordinator: '' },
        an = De.c().shape({
          coordinator: De.d()
            .email('Must be a valid email')
            .required('Email address must not be blank')
        }),
        sn = n(482),
        cn = n(483),
        on = function (e) {
          return Object(a.jsxs)(a.Fragment, {
            children: [
              Object(a.jsx)(le.a, {
                component: de.a,
                children: Object(a.jsxs)(ue.a, {
                  'aria-label': 'simple table',
                  children: [
                    Object(a.jsx)(je.a, {
                      children: Object(a.jsxs)(be.a, {
                        children: [
                          Object(a.jsx)(he.a, { children: 'Name' }),
                          Object(a.jsx)(he.a, {
                            align: 'right',
                            children: 'Email'
                          }),
                          Object(a.jsx)(he.a, {
                            align: 'right',
                            children: 'Actions'
                          })
                        ]
                      })
                    }),
                    Object(a.jsx)(pe.a, {
                      children: e.refreshing
                        ? Object(a.jsx)(be.a, {
                            children: Object(a.jsx)(he.a, {
                              component: 'th',
                              scope: 'row',
                              colSpan: 3,
                              children: 'Refreshing Coordinator List ...'
                            })
                          })
                        : 0 === e.value.length
                        ? Object(a.jsx)(be.a, {
                            children: Object(a.jsx)(he.a, {
                              component: 'th',
                              scope: 'row',
                              colSpan: 3,
                              children: 'No Coordinators Found'
                            })
                          })
                        : e.value.map(function (t) {
                            return Object(a.jsxs)(
                              be.a,
                              {
                                children: [
                                  Object(a.jsx)(he.a, {
                                    component: 'th',
                                    scope: 'row',
                                    children: t.displayName
                                  }),
                                  Object(a.jsx)(he.a, {
                                    align: 'right',
                                    children: t.email
                                  }),
                                  Object(a.jsx)(he.a, {
                                    align: 'right',
                                    children: Object(a.jsx)(oe.a, {
                                      variant: 'outlined',
                                      color: 'secondary',
                                      startIcon: Object(a.jsx)(kt.a, {}),
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
              Object(a.jsx)(Gt, {
                open: e.open,
                setOpen: e.setOpen,
                message: e.alert.message,
                severity: e.alert.severity
              })
            ]
          })
        },
        rn = c.a.forwardRef(function (e, t) {
          return Object(a.jsx)(
            sn.a,
            Object(b.a)({ direction: 'up', ref: t }, e)
          )
        })
      function ln(e) {
        var t,
          n = Object(s.useState)(),
          c = Object(h.a)(n, 2),
          o = c[0],
          r = c[1],
          i = Object(s.useState)([]),
          l = Object(h.a)(i, 2),
          d = l[0],
          u = l[1],
          j = Object(s.useState)(!1),
          b = Object(h.a)(j, 2),
          p = b[0],
          O = b[1],
          g = Object(s.useState)(!0),
          x = Object(h.a)(g, 2),
          f = x[0],
          v = x[1],
          m = Object(s.useState)({}),
          y = Object(h.a)(m, 2),
          S = y[0],
          C = y[1],
          P = Object(s.useState)(!1),
          T = Object(h.a)(P, 2),
          w = T[0],
          A = T[1],
          k = Object(s.useState)({}),
          _ = Object(h.a)(k, 2),
          N = _[0],
          R = _[1],
          E = Object(s.useState)(!1),
          I = Object(h.a)(E, 2),
          D = I[0],
          M = I[1],
          L = Object(Se.c)({
            resolver: Object(Ie.yupResolver)(an),
            reValidateMode: 'onChange',
            defaultValues: nn
          }),
          U = L.register,
          F = L.handleSubmit,
          B = L.errors
        Object(s.useEffect)(function () {
          q()
        }, [])
        var q = function () {
            v(!0),
              W.get('/coordinator')
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
                    R({ message: e.message, severity: 'error' }),
                    M(!0),
                    v(!1)
                })
                .finally(function () {
                  v(!1)
                })
          },
          V = function (e) {
            e
              ? (W.post('/coordinator/remove', { coordinatorId: o._id })
                  .then(function (e) {
                    console.log(e),
                      R({
                        message: 'Coordinator sucessfully removed',
                        severity: 'success'
                      }),
                      M(!0),
                      q()
                  })
                  .catch(function (e) {
                    switch (e) {
                      case 'error_while_retrieving_coordinator':
                        R({
                          message:
                            'An error occurred while retrieving the selected coordinator, please try again',
                          severity: 'warning'
                        })
                        break
                      case 'unable_to_remove':
                        R({
                          message:
                            'Could not remove coordinator, please try again',
                          severity: 'warning'
                        })
                        break
                      case 'coordinator_not_found':
                        R({
                          message: 'Could not find selected coordinator',
                          severity: 'warning'
                        }),
                          q()
                        break
                      default:
                        console.log(e),
                          R({
                            message: 'Could not remove coordinator',
                            severity: 'error'
                          })
                    }
                    M(!0)
                  }),
                O(!1))
              : O(!1)
          }
        return Object(a.jsxs)(re.a, {
          maxWidth: 'md',
          children: [
            Object(a.jsxs)($.a, {
              open: p,
              TransitionComponent: rn,
              'aria-labelledby': 'alert-dialog-slide-title',
              'aria-describedby': 'alert-dialog-slide-description',
              children: [
                Object(a.jsx)(ee.a, {
                  id: 'alert-dialog-slide-title',
                  children: 'Remove Coordinator?'
                }),
                Object(a.jsx)(te.a, {
                  children: Object(a.jsxs)(ne.a, {
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
                Object(a.jsxs)(ce.a, {
                  children: [
                    Object(a.jsx)(oe.a, {
                      variant: 'outlined',
                      onClick: function () {
                        return V(!1)
                      },
                      color: 'primary',
                      children: 'No'
                    }),
                    Object(a.jsx)(oe.a, {
                      startIcon: Object(a.jsx)(Zt.a, {}),
                      variant: 'contained',
                      onClick: function () {
                        return V(!0)
                      },
                      color: 'secondary',
                      children: 'Yes'
                    })
                  ]
                })
              ]
            }),
            Object(a.jsx)(J.a, {
              variant: 'h6',
              children: 'Manage Coordinators'
            }),
            Object(a.jsx)('br', {}),
            Object(a.jsxs)('form', {
              onSubmit: F(function (e) {
                W.post('/coordinator/assign', e)
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
                          q()
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
                    console.log(S), A(!0)
                  })
                  .catch(function (e) {
                    C({
                      message: 'An error occurred, please try again',
                      severity: 'warning'
                    }),
                      A(!0)
                  })
              }),
              children: [
                Object(a.jsx)(Be, {
                  inputRef: U,
                  label: 'Coordinator Email',
                  placeholder: 'e.g. John.Keane@ul.ie',
                  variant: 'outlined',
                  name: 'coordinator',
                  style: { margin: 0 },
                  error: !!B.coordinator,
                  helperText:
                    null === B ||
                    void 0 === B ||
                    null === (t = B.coordinator) ||
                    void 0 === t
                      ? void 0
                      : t.message
                }),
                Object(a.jsx)(ye, {
                  variant: 'contained',
                  color: 'primary',
                  endIcon: Object(a.jsx)(cn.a, {}),
                  children: 'Assign New Coordinator'
                }),
                Object(a.jsx)(Gt, {
                  open: w,
                  setOpen: A,
                  message: S.message,
                  severity: S.severity
                })
              ]
            }),
            Object(a.jsx)(J.a, {
              variant: 'h6',
              children: 'Existing Coordinators'
            }),
            Object(a.jsx)('br', {}),
            Object(a.jsx)(on, {
              refreshing: f,
              value: d,
              open: D,
              setOpen: M,
              handleRemove: function (e) {
                r(e), O(!0)
              },
              alert: N
            })
          ]
        })
      }
      var dn = n(486),
        un = n(504),
        jn = n(250),
        bn = n(243),
        hn = n.n(bn),
        pn = n(244),
        On = n.n(pn),
        gn = n(484),
        xn = n(485),
        fn = n(245),
        vn = n.n(fn),
        mn = Object(ve.a)(function (e) {
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
      function yn(e) {
        var t = mn(),
          n = Object(s.useContext)(P).currentPhase,
          c = (Object(p.f)(), Object(O.d)().instance),
          o = Object(s.useState)(null),
          r = Object(h.a)(o, 2),
          l = r[0],
          d = r[1]
        console.log(n)
        return Object(a.jsxs)(H.a, {
          children: [
            Object(a.jsxs)('div', {
              style: { flexGrow: 1 },
              children: [
                Object(a.jsx)(i.b, {
                  to: '/',
                  children: Object(a.jsx)(Pe.a, {
                    edge: 'start',
                    'aria-label': 'home',
                    children: Object(a.jsx)(hn.a, {
                      fontSize: 'large',
                      style: { color: 'white' }
                    })
                  })
                }),
                3 === n.phase || 4 === n.phase
                  ? Object(a.jsxs)(a.Fragment, {
                      children: [
                        Object(a.jsx)(k, {
                          I: 'read',
                          a: 'Topic',
                          children: Object(a.jsx)(i.b, {
                            to: '/topics',
                            className: t.linkButton,
                            children: Object(a.jsx)(oe.a, {
                              className: t.linkText,
                              children: 'View Topics List'
                            })
                          })
                        }),
                        Object(a.jsx)(k, {
                          I: 'manage',
                          a: 'Proposal',
                          children: Object(a.jsx)(i.b, {
                            to: '/proposals',
                            className: t.linkButton,
                            children: Object(a.jsx)(oe.a, {
                              className: t.linkText,
                              children: 'Manage Proposals'
                            })
                          })
                        })
                      ]
                    })
                  : null,
                (2 === n.phase || 3 === n.phase || 4 === n.phase) &&
                  Object(a.jsx)(k, {
                    I: 'manage',
                    a: 'Topic',
                    children: Object(a.jsx)(i.b, {
                      to: '/topics/manage',
                      className: t.linkButton,
                      children: Object(a.jsx)(oe.a, {
                        className: t.linkText,
                        children: 'Manage Topic List'
                      })
                    })
                  }),
                Object(a.jsxs)(k, {
                  I: 'takeActionPhaseOne',
                  this: n,
                  children: [
                    Object(a.jsx)(k, {
                      I: 'manage',
                      a: 'Student',
                      children: Object(a.jsx)(i.b, {
                        to: '/student/manage',
                        className: t.linkButton,
                        children: Object(a.jsx)(oe.a, {
                          className: t.linkText,
                          children: 'Manage Students'
                        })
                      })
                    }),
                    Object(a.jsx)(k, {
                      I: 'manage',
                      a: 'Supervisor',
                      children: Object(a.jsx)(i.b, {
                        to: '/supervisor/manage',
                        className: t.linkButton,
                        children: Object(a.jsx)(oe.a, {
                          className: t.linkText,
                          children: 'Manage Supervisors'
                        })
                      })
                    })
                  ]
                }),
                Object(a.jsxs)(k, {
                  I: 'takeActionPhaseOne',
                  this: n,
                  children: [
                    Object(a.jsx)(k, {
                      I: 'create',
                      a: 'Coordinator',
                      children: Object(a.jsx)(i.b, {
                        to: '/coordinator',
                        className: t.linkButton,
                        children: Object(a.jsx)(oe.a, {
                          className: t.linkText,
                          children: 'Manage Coordinators'
                        })
                      })
                    }),
                    Object(a.jsx)(k, {
                      I: 'update',
                      a: 'Phase',
                      children: Object(a.jsx)(i.b, {
                        to: '/phase/manage',
                        className: t.linkButton,
                        children: Object(a.jsx)(oe.a, {
                          className: t.linkText,
                          children: 'Manage Phases'
                        })
                      })
                    })
                  ]
                })
              ]
            }),
            Object(a.jsxs)(nt.a, {
              edge: 'end',
              children: [
                Object(a.jsx)(oe.a, {
                  'aria-label': 'delete',
                  onClick: function (e) {
                    d(e.currentTarget)
                  },
                  endIcon: Object(a.jsx)(On.a, { style: { color: 'white' } }),
                  children: Object(a.jsx)(un.a, {
                    style: { color: 'white' },
                    children: 'AB'
                  })
                }),
                Object(a.jsx)(jn.a, {
                  anchorEl: l,
                  keepMounted: !0,
                  open: Boolean(l),
                  onClose: function () {
                    d(null)
                  },
                  getContentAnchorEl: null,
                  anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
                  transformOrigin: { vertical: 'top', horizontal: 'center' },
                  children: Object(a.jsxs)(ke.a, {
                    onClick: function () {
                      c.logout({
                        onRedirectNavigate: 'http://localhost:3000/'
                      }),
                        d(null)
                    },
                    children: [
                      Object(a.jsx)(gn.a, {
                        children: Object(a.jsx)(vn.a, { fontSize: 'small' })
                      }),
                      Object(a.jsx)(xn.a, { primary: 'Logout' })
                    ]
                  })
                })
              ]
            })
          ]
        })
      }
      var Sn = Object(ve.a)(function (e) {
        return { appBar: { zIndex: e.zIndex.drawer + 1 } }
      })
      function Cn(e) {
        var t = Sn()
        return Object(a.jsx)(dn.a, {
          position: 'fixed',
          className: t.appBar,
          children: Object(a.jsx)(yn, {})
        })
      }
      var Pn = {
          draft: 'Draft',
          submitted: 'Pending Supervisor Feedback',
          under_review: 'Under Review',
          pending_edits: 'Edits Required',
          accepted: 'Accepted',
          rejected: 'Rejected'
        },
        Tn = function (e) {
          return Pn[e]
        },
        wn = {
          title: De.d().required('Proposal must have a title'),
          description: De.d().required('Proposal must have a description'),
          chooseMeMessage: De.d(),
          additionalNotes: De.d(),
          environment: De.d(),
          languages: De.d()
        },
        An =
          (De.c().shape(Object(b.a)({}, wn)),
          De.c().shape({
            description: De.d().required('Proposal must have a description'),
            chooseMeMessage: De.d(),
            additionalNotes: De.d(),
            environment: De.d(),
            languages: De.d()
          })),
        kn = Object(ve.a)(function (e) {
          return {
            formControl: { minWidth: 300, flex: 1 },
            selectEmpty: { marginTop: e.spacing(2) },
            readOnlySelect: {
              width: 300,
              '&.Mui-disabled option': { color: 'black' }
            },
            buttonProgress: {
              color: Ee.a[500],
              position: 'absolute',
              left: '50%'
            }
          }
        }),
        _n = function (e) {
          var t,
            n,
            c,
            o,
            r,
            i,
            l,
            d,
            u = kn(),
            j = {
              title: (d = e.proposal).title,
              description: d.description,
              chooseMessage: d.chooseMessage || '',
              additionalNotes: d.additionalNotes || '',
              environment: d.environment,
              languages: d.languages,
              type: d.type
            },
            b = Object(s.useState)(!1),
            p = Object(h.a)(b, 2),
            O = p[0],
            g = p[1],
            x = Object(s.useState)(!1),
            f = Object(h.a)(x, 2),
            v = f[0],
            m = f[1],
            y =
              (Object(s.useContext)(P).currentPhase,
              Object(Se.c)({
                resolver: Object(Ie.yupResolver)(An),
                reValidateMode: 'onChange',
                defaultValues: j
              })),
            S = y.register,
            C = y.handleSubmit,
            T = y.errors,
            w =
              (y.control,
              function () {
                g(!O)
              })
          return Object(a.jsxs)($.a, {
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
              Object(a.jsxs)(ee.a, {
                id: 'max-width-dialog-title',
                children: [
                  ['draft', 'pending_edits'].includes(e.proposal.status)
                    ? Object(a.jsx)(Pe.a, {
                        onClick: w,
                        disabled: v,
                        children: Object(a.jsx)(Re.a, {})
                      })
                    : null,
                  Object(a.jsx)(Pe.a, {
                    edge: 'end',
                    onClick: function () {
                      e.setDialogOpen(!1)
                    },
                    disabled: v,
                    children: Object(a.jsx)(Ne.a, {})
                  }),
                  Object(a.jsx)(Te.a, {})
                ]
              }),
              Object(a.jsxs)(te.a, {
                children: [
                  Object(a.jsx)(Be, {
                    inputRef: S,
                    name: 'title',
                    label: 'Title',
                    variant: 'outlined',
                    margin: 'none',
                    readOnly: !O,
                    error: !!T.description,
                    helperText:
                      null === T ||
                      void 0 === T ||
                      null === (t = T.description) ||
                      void 0 === t
                        ? void 0
                        : t.message
                  }),
                  Object(a.jsxs)('form', {
                    onSubmit: C(function (t) {
                      console.log('Submitting', t)
                      var n = (function (t) {
                        var n = Ce.reduce(
                          t,
                          function (t, n, a) {
                            return Ce.isEqual(n, e.proposal[a]) || (t[a] = n), t
                          },
                          {}
                        )
                        return Object.keys(n).length > 0 ? n : null
                      })(t)
                      console.log('Differences', n),
                        n
                          ? W.post('/proposal/edit/'.concat(e.proposal._id), n)
                              .then(function (t) {
                                console.log(t), e.refresh()
                              })
                              .catch(function (e) {
                                console.log(e)
                              })
                              .finally(function () {
                                m(!1), w()
                              })
                          : w()
                    }),
                    children: [
                      Object(a.jsx)(qe, {
                        inputRef: S,
                        name: 'description',
                        label: 'Description',
                        readOnly: !O,
                        error: !!T.description,
                        helperText:
                          null === T ||
                          void 0 === T ||
                          null === (n = T.description) ||
                          void 0 === n
                            ? void 0
                            : n.message
                      }),
                      Object(a.jsx)(qe, {
                        inputRef: S,
                        label: 'Choose Me Message',
                        placeholder: '<No Choose Message Supplied>',
                        name: 'chooseMessage',
                        readOnly: !O,
                        error: !!T.chooseMessage,
                        helperText:
                          null === T ||
                          void 0 === T ||
                          null === (c = T.chooseMessage) ||
                          void 0 === c
                            ? void 0
                            : c.message
                      }),
                      Object(a.jsx)(qe, {
                        inputRef: S,
                        label: 'Additional Notes',
                        placeholder: '<No Additional Notes Supplied>',
                        name: 'additionalNotes',
                        readOnly: !O,
                        error: !!T.additionalNotes,
                        helperText:
                          null === T ||
                          void 0 === T ||
                          null === (o = T.additionalNotes) ||
                          void 0 === o
                            ? void 0
                            : o.message
                      }),
                      'studentDefined' === j.type
                        ? Object(a.jsxs)(a.Fragment, {
                            children: [
                              Object(a.jsx)(qe, {
                                inputRef: S,
                                label: 'Environment',
                                name: 'environment',
                                readOnly: !O,
                                error: !!T.environment,
                                helperText:
                                  null === T ||
                                  void 0 === T ||
                                  null === (r = T.environment) ||
                                  void 0 === r
                                    ? void 0
                                    : r.message
                              }),
                              Object(a.jsx)(qe, {
                                inputRef: S,
                                label: 'Languages',
                                name: 'languages',
                                readOnly: !O,
                                error: !!T.languages,
                                helperText:
                                  null === T ||
                                  void 0 === T ||
                                  null === (i = T.languages) ||
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
                              Object(a.jsx)(Te.a, {}),
                              Object(a.jsx)(J.a, {
                                variant: 'h6',
                                children: 'Supervisor Feedback'
                              }),
                              Object(a.jsx)(qe, {
                                label: 'Supervisor Notes',
                                value: e.proposal.supervisorMessage,
                                readOnly: !0
                              })
                            ]
                          })
                        : null,
                      O &&
                        Object(a.jsx)(ye, {
                          disabled: v,
                          children: 'Save Changes'
                        })
                    ]
                  })
                ]
              }),
              Object(a.jsx)(ce.a, {
                children: O
                  ? Object(a.jsx)(a.Fragment, {
                      children:
                        v &&
                        Object(a.jsx)(_e.a, {
                          size: 24,
                          className: u.buttonProgress
                        })
                    })
                  : null
              })
            ]
          })
        }
      _n.defaultProps = {
        proposal: {},
        setDialogOpen: function () {},
        dialogOpen: !0,
        refresh: function () {}
      }
      var Nn = _n,
        Rn = function (e) {
          var t = Object(s.useContext)(P).currentPhase
          switch (e.status) {
            case 'draft':
              return Object(a.jsx)(oe.a, {
                onClick: function () {
                  return e.updateStatus(e.proposalId)
                },
                children: 'Submit Proposal'
              })
            case 'pending_edits':
              return Object(a.jsx)(oe.a, {
                onClick: function () {
                  return e.updateStatus(e.proposalId)
                },
                children: 'Submit Updated Proposal'
              })
            case 'submitted':
              return Object(a.jsx)(k, {
                I: 'takeActionPhaseThree',
                this: t,
                children: Object(a.jsx)(oe.a, {
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
        En = function (e) {
          var t = Object(p.f)()
          return Object(a.jsx)(le.a, {
            component: de.a,
            children: Object(a.jsxs)(ue.a, {
              'aria-label': 'simple table',
              children: [
                Object(a.jsx)(je.a, {
                  children: Object(a.jsxs)(be.a, {
                    children: [
                      Object(a.jsx)(he.a, { children: 'Title' }),
                      Object(a.jsx)(he.a, { children: 'For Topic' }),
                      Object(a.jsx)(he.a, { children: 'Status' }),
                      Object(a.jsx)(he.a, {
                        align: 'right',
                        children: 'Actions'
                      })
                    ]
                  })
                }),
                Object(a.jsx)(pe.a, {
                  children: e.loading
                    ? Object(a.jsx)(
                        be.a,
                        {
                          children: Object(a.jsx)(he.a, {
                            colSpan: 4,
                            children: 'Loading Values ...'
                          })
                        },
                        'loading_supervisor_proposals'
                      )
                    : 0 === e.values.length
                    ? Object(a.jsx)(
                        be.a,
                        {
                          children: Object(a.jsx)(he.a, {
                            colSpan: 4,
                            children: 'No Proposals to show'
                          })
                        },
                        'no_supervisor_proposals'
                      )
                    : e.values.map(function (n) {
                        return Object(a.jsxs)(
                          be.a,
                          {
                            children: [
                              Object(a.jsx)(he.a, {
                                children: Object(a.jsx)(Oe.a, {
                                  onClick: function () {
                                    e.setSelectedProposal(n),
                                      e.setDialogOpen(!0)
                                  },
                                  children: n.title
                                })
                              }),
                              Object(a.jsx)(he.a, {
                                children: Object(a.jsx)(Oe.a, {
                                  onClick: function () {
                                    return t.push(
                                      '/topics/view/'.concat(n.topic.code)
                                    )
                                  },
                                  children: n.topic.title
                                })
                              }),
                              Object(a.jsx)(he.a, { children: Tn(n.status) }),
                              Object(a.jsx)(he.a, {
                                align: 'right',
                                children: Object(a.jsx)(Rn, {
                                  status: n.status,
                                  proposalId: n._id,
                                  updateStatus: e.updateStatus,
                                  downgradeStatus: e.downgradeStatus
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
        In = function (e) {
          var t = Object(s.useState)([]),
            n = Object(h.a)(t, 2),
            c = n[0],
            o = n[1],
            r = Object(s.useState)([]),
            i = Object(h.a)(r, 2),
            l = i[0],
            d = i[1],
            u = Object(s.useState)(),
            j = Object(h.a)(u, 2),
            b = j[0],
            p = j[1],
            O = Object(s.useState)(!0),
            g = Object(h.a)(O, 2),
            x = g[0],
            f = g[1],
            v = Object(s.useState)(!1),
            m = Object(h.a)(v, 2),
            y = m[0],
            S = m[1]
          Object(s.useEffect)(function () {
            C()
          }, [])
          var C = function () {
              W.get('/proposal/me')
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
            P = function (e) {
              W.post('/proposal/'.concat(e, '/upgrade'))
                .then(function (e) {
                  console.log(e), C()
                })
                .catch(function (e) {
                  console.log(e)
                })
            },
            T = function (e) {
              W.post('/proposal/'.concat(e, '/downgrade'))
                .then(function (e) {
                  console.log(e), C()
                })
                .catch(function (e) {
                  console.log(e)
                })
            }
          return Object(a.jsxs)(a.Fragment, {
            children: [
              b
                ? Object(a.jsx)(
                    Nn,
                    {
                      dialogOpen: y,
                      setDialogOpen: function (e) {
                        e || p(null), S(e)
                      },
                      proposal: b,
                      refresh: C
                    },
                    b._id
                  )
                : null,
              Object(a.jsxs)(re.a, {
                maxWidth: 'lg',
                children: [
                  Object(a.jsx)(J.a, {
                    variant: 'h4',
                    align: 'center',
                    children: 'Proposal Management'
                  }),
                  Object(a.jsx)(J.a, {
                    children: 'Supervisor Topic Proposals'
                  }),
                  Object(a.jsx)(En, {
                    loading: x,
                    values: c,
                    updateStatus: P,
                    downgradeStatus: T,
                    setSelectedProposal: p,
                    setDialogOpen: S
                  }),
                  Object(a.jsx)(J.a, { children: 'Custom Proposals' }),
                  Object(a.jsx)(En, {
                    loading: x,
                    values: l,
                    updateStatus: P,
                    downgradeStatus: T,
                    setSelectedProposal: p,
                    setDialogOpen: S
                  })
                ]
              })
            ]
          })
        },
        Dn = Object(ve.a)(function (e) {
          return { class1: { marginLeft: e.spacing(4) } }
        }),
        Mn = function (e) {
          var t = Object(p.g)().code,
            n = Dn(),
            c = Object(s.useState)(!0),
            o = Object(h.a)(c, 2),
            r = o[0],
            l = o[1],
            d = Object(s.useState)(null),
            u = Object(h.a)(d, 2),
            j = u[0],
            b = u[1],
            O = Object(s.useState)(!1),
            g = Object(h.a)(O, 2),
            x = g[0],
            f = g[1]
          return (
            Object(s.useEffect)(function () {
              W.get('/topic/'.concat(t))
                .then(function (e) {
                  e.data.topic ? (console.log(e), b(e.data.topic)) : f(!0)
                })
                .catch(function (e) {
                  console.log(e)
                })
                .finally(function () {
                  l(!1)
                })
            }, []),
            r
              ? Object(a.jsx)('h1', { children: 'loading ...' })
              : x
              ? Object(a.jsx)('h1', { children: 'Invalid Topic Code' })
              : Object(a.jsxs)(re.a, {
                  maxWidth: 'md',
                  children: [
                    Object(a.jsx)(Ft, { dense: !0 }),
                    Object(a.jsx)(J.a, { variant: 'h4', children: j.title }),
                    Object(a.jsxs)(J.a, {
                      variant: 'subtitle',
                      className: n.class1,
                      children: ['Supervisor: ', j.supervisor.displayName]
                    }),
                    Object(a.jsx)('br', {}),
                    Object(a.jsx)(J.a, {
                      variant: 'overline',
                      children: 'Description'
                    }),
                    Object(a.jsx)(J.a, {
                      variant: 'body1',
                      className: n.class1,
                      children: j.description
                    }),
                    '' === j.additionalNotes
                      ? null
                      : Object(a.jsxs)(a.Fragment, {
                          children: [
                            Object(a.jsx)(J.a, {
                              variant: 'overline',
                              children: 'Additional Notes'
                            }),
                            Object(a.jsx)(J.a, {
                              variant: 'body1',
                              className: n.class1,
                              children: j.additionalNotes
                            })
                          ]
                        }),
                    Object(a.jsx)('div', {
                      children: j.tags.map(function (e) {
                        return Object(a.jsx)(
                          nt.a,
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
                    Object(a.jsx)(k, {
                      I: 'create',
                      a: 'Proposal',
                      children: (
                        null === j || void 0 === j ? void 0 : j.hasProposal
                      )
                        ? Object(a.jsx)(J.a, {
                            style: { fontSize: '25px' },
                            align: 'center',
                            children: Object(a.jsx)(i.b, {
                              to: '/proposals',
                              children:
                                'You already created a Proposal for this topic'
                            })
                          })
                        : Object(a.jsx)(i.b, {
                            to: '/proposals/add/'.concat(j.code),
                            children: Object(a.jsx)(ye, {
                              children:
                                'Look interesting? Draft Proposal for this Topic'
                            })
                          })
                    })
                  ]
                })
          )
        },
        Ln = function (e) {
          var t = Z().contextData
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
        Un = De.c().shape({
          title: De.d().required('Proposal must have a title'),
          description: De.d().required('Proposl must have a description'),
          additionalNotes: De.d(),
          chooseMeMessage: De.d()
        }),
        Wn = function (e) {
          var t,
            n,
            c,
            o,
            r = Object(s.useState)(!0),
            i = Object(h.a)(r, 2),
            l = i[0],
            d = i[1],
            u = Object(s.useState)(!1),
            j = Object(h.a)(u, 2),
            O = j[0],
            g = j[1],
            x = Z(),
            f = x.setContextData,
            v = x.contextData,
            m = Object(p.g)().topicCode,
            y = {
              title: (null === v || void 0 === v ? void 0 : v.title) || '',
              description:
                (null === v || void 0 === v ? void 0 : v.description) || '',
              additionalNotes:
                (null === v || void 0 === v ? void 0 : v.additionalNotes) || '',
              chooseMeMessage:
                (null === v || void 0 === v ? void 0 : v.chooseMeMessage) || ''
            },
            S = Object(Se.c)({
              resolver: Object(Ie.yupResolver)(Un),
              revalidate: 'onChange',
              defaultValues: y
            }),
            C = S.register,
            P = S.handleSubmit,
            T = S.errors,
            w = Object(p.f)()
          Object(s.useEffect)(function () {
            m && null === v.topic
              ? (console.log('Loading from topicCode'),
                W.get('/topic/' + m)
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
            ? Object(a.jsxs)(re.a, {
                component: 'main',
                maxWidth: 'md',
                children: [
                  Object(a.jsx)(Ln, {}),
                  Object(a.jsx)(J.a, { children: 'Create Proposal - Step 1' }),
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
                      Object(a.jsx)(Be, {
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
                      Object(a.jsx)(qe, {
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
                      Object(a.jsx)(qe, {
                        inputRef: C,
                        name: 'chooseMeMessage',
                        label: 'Why choose me for this topic? (Optional)',
                        placeholder:
                          'Why should the topic supervisor choose your project for this topic?',
                        error: !!T.chooseMeMessage,
                        helperText:
                          null === T ||
                          void 0 === T ||
                          null === (c = T.chooseMeMessage) ||
                          void 0 === c
                            ? void 0
                            : c.message
                      }),
                      Object(a.jsx)(qe, {
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
                      Object(a.jsx)(ye, { children: 'Save and Continue' })
                    ]
                  })
                ]
              })
            : Object(a.jsx)('h1', {
                children: 'Cannot create proposal without a selected topic'
              })
        },
        Fn = De.c().shape({
          environment: De.d().required(),
          languages: De.d().required()
        }),
        Bn = { environment: '', languages: '' },
        qn = function (e) {
          var t,
            n,
            s = Z(),
            c = s.setContextData,
            o = s.contextData,
            r = Object(Se.c)({
              resolver: Object(Ie.yupResolver)(Fn),
              reValidateMode: 'onChange',
              defaultValues: Bn
            }),
            i = r.register,
            l = r.handleSubmit,
            d = r.errors,
            u = Object(p.f)()
          return Object(a.jsxs)(re.a, {
            component: 'main',
            maxWidth: 'md',
            children: [
              Object(a.jsx)(Ln, {}),
              Object(a.jsx)(J.a, { children: 'Create Proposal - Step 2' }),
              Object(a.jsxs)('form', {
                autoComplete: 'off',
                onSubmit: l(function (e) {
                  var t = Object(b.a)(
                    Object(b.a)({}, o),
                    {},
                    { environment: e.environment, languages: e.languages }
                  )
                  2 === (null === o || void 0 === o ? void 0 : o.step) &&
                    (t.step = 3),
                    u.push('./finish'),
                    c(t)
                }),
                children: [
                  Object(a.jsx)(qe, {
                    inputRef: i,
                    name: 'environment',
                    label: 'Environment Required',
                    error: !!d.environment,
                    helperText:
                      null === d ||
                      void 0 === d ||
                      null === (t = d.environment) ||
                      void 0 === t
                        ? void 0
                        : t.message
                  }),
                  Object(a.jsx)(qe, {
                    inputRef: i,
                    name: 'languages',
                    label: 'Languages / Technologies Required',
                    error: !!d.languages,
                    helperText:
                      null === d ||
                      void 0 === d ||
                      null === (n = d.languages) ||
                      void 0 === n
                        ? void 0
                        : n.message
                  }),
                  Object(a.jsx)(ye, { children: 'Save and Continue' })
                ]
              })
            ]
          })
        },
        Vn = n(161),
        zn = n.n(Vn),
        Hn = function (e) {
          var t,
            n = Z(),
            c = n.setContextData,
            o = n.contextData,
            r = Object(s.useContext)(P).currentPhase,
            i = Object(p.f)(),
            l = function (e) {
              var t = {
                isCustomProposal: o.isCustomProposal,
                title: o.title,
                description: o.description,
                additionalNotes: o.additionalNotes,
                chooseMessage: o.chooseMeMessage,
                topic: o.topic._id,
                saveAsDraft: !e
              }
              if (o.isCustomProposal) {
                var n = Object(b.a)({}, t)
                t = Object(b.a)(
                  Object(b.a)({}, n),
                  {},
                  { environment: o.environment, languages: o.languages }
                )
              }
              console.log('Submitting ', t),
                W.post('/proposal/add', t)
                  .then(function (e) {
                    console.log(e), c({}), i.push('/proposals')
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
            }
          return Object(a.jsxs)(re.a, {
            component: 'main',
            maxWidth: 'md',
            children: [
              Object(a.jsx)(Ln, {}),
              Object(a.jsx)(J.a, {
                children: 'Create Proposal - Finish (Review)'
              }),
              Object(a.jsx)('code', { children: JSON.stringify(o) }),
              Object(a.jsx)(J.a, {
                children: o.isCustomProposal
                  ? 'Custom Proposal'
                  : 'Supervisor Defined Proposal'
              }),
              o.isCustomProposal
                ? null
                : Object(a.jsxs)(a.Fragment, {
                    children: [
                      Object(a.jsx)(J.a, { children: o.topic.title }),
                      Object(a.jsx)(J.a, {
                        children:
                          null === (t = o.topic.supervisor) || void 0 === t
                            ? void 0
                            : t.displayName
                      })
                    ]
                  }),
              Object(a.jsx)(J.a, { children: o.title }),
              Object(a.jsx)(J.a, { children: o.description }),
              Object(a.jsx)(J.a, { children: o.additionalNotes }),
              o.isCustomProposal
                ? Object(a.jsxs)(a.Fragment, {
                    children: [
                      Object(a.jsx)(J.a, { children: o.environment }),
                      Object(a.jsx)(J.a, { children: o.languages })
                    ]
                  })
                : null,
              4 === r.phase
                ? Object(a.jsxs)(a.Fragment, {
                    children: [
                      Object(a.jsx)(ye, {
                        onClick: function () {
                          return l(!0)
                        },
                        endIcon: Object(a.jsx)(gt.a, {
                          title: 'Not editable after submission',
                          children: Object(a.jsx)(zn.a, {})
                        }),
                        children: 'Submit Proposal'
                      }),
                      Object(a.jsx)(ye, {
                        onClick: function () {
                          return l(!1)
                        },
                        endIcon: Object(a.jsx)(gt.a, {
                          title: 'Editable until submitted',
                          children: Object(a.jsx)(zn.a, {})
                        }),
                        children: 'Save Proposal as Draft'
                      })
                    ]
                  })
                : Object(a.jsx)(ye, {
                    onClick: function () {
                      return l(!0)
                    },
                    endIcon: Object(a.jsx)(gt.a, {
                      title: 'Not editable after submission',
                      children: Object(a.jsx)(zn.a, {})
                    }),
                    children: 'Submit Proposal'
                  })
            ]
          })
        },
        Gn =
          (De.c({
            email: De.d().email().required(),
            accountType: De.d().required()
          }),
          function (e) {
            return Object(a.jsx)(re.a, {
              maxWidth: 'lg',
              children: Object(a.jsx)(J.a, {
                align: 'center',
                style: { marginTop: '25px' },
                children: 'You have not been allowed access to this system.'
              })
            })
          }),
        Yn = function () {
          return Object(a.jsxs)(re.a, {
            maxWidth: 'md',
            children: [
              Object(a.jsx)(J.a, {
                align: 'center',
                variant: 'h3',
                children: 'The requested page could not be found'
              }),
              Object(a.jsx)(J.a, {
                align: 'center',
                variant: 'h1',
                children: ':('
              }),
              Object(a.jsx)(i.b, {
                to: '/',
                button: !0,
                children: 'Back to Homepage'
              })
            ]
          })
        },
        Zn = function (e) {
          var t = Object(s.useState)(!1),
            n = Object(h.a)(t, 2),
            c = n[0],
            o = (n[1], Object(s.useState)([])),
            r = Object(h.a)(o, 2),
            l = r[0],
            d = r[1],
            u = Object(p.g)().topicId
          return (
            Object(s.useEffect)(function () {
              W.get('/topic/proposals/'.concat(u))
                .then(function (e) {
                  console.log(e), d(e.data.proposals)
                })
                .catch(function (e) {
                  console.log(e)
                })
            }, []),
            Object(a.jsxs)(re.a, {
              maxWidth: 'lg',
              children: [
                Object(a.jsx)(Ft, {}),
                Object(a.jsx)(J.a, { children: 'Student Proposals' }),
                Object(a.jsx)(le.a, {
                  component: de.a,
                  children: Object(a.jsxs)(ue.a, {
                    'aria-label': 'simple table',
                    children: [
                      Object(a.jsx)(je.a, {
                        children: Object(a.jsxs)(be.a, {
                          children: [
                            Object(a.jsx)(he.a, { children: 'Title' }),
                            Object(a.jsx)(he.a, {
                              align: 'center',
                              children: 'Student'
                            }),
                            Object(a.jsx)(he.a, {
                              align: 'right',
                              children: 'Status'
                            })
                          ]
                        })
                      }),
                      Object(a.jsx)(pe.a, {
                        children: c
                          ? Object(a.jsx)(
                              be.a,
                              {
                                children: Object(a.jsx)(he.a, {
                                  colSpan: 3,
                                  align: 'center',
                                  children: 'Loading Values ...'
                                })
                              },
                              'loading_supervisor_proposals'
                            )
                          : 0 === l.length
                          ? Object(a.jsx)(
                              be.a,
                              {
                                children: Object(a.jsx)(he.a, {
                                  colSpan: 3,
                                  align: 'center',
                                  children: 'You have no proposals to review'
                                })
                              },
                              'no_supervisor_proposals'
                            )
                          : l.map(function (e) {
                              return Object(a.jsxs)(
                                be.a,
                                {
                                  children: [
                                    Object(a.jsx)(he.a, {
                                      children: Object(a.jsx)(i.b, {
                                        to: '/proposal/view/'.concat(e._id),
                                        children: e.title
                                      })
                                    }),
                                    Object(a.jsx)(he.a, {
                                      align: 'center',
                                      children: e.student.displayName
                                    }),
                                    Object(a.jsx)(he.a, {
                                      align: 'right',
                                      children: Tn(e.status)
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
      Zn.defaultProps = {
        topic: {},
        dialogOpen: !1,
        setDialogOpen: function () {},
        refresh: function () {}
      }
      var Jn = Zn,
        Kn = n(487),
        Qn = function e(t) {
          Object(S.a)(this, e), Object.assign(this, t)
        },
        Xn = De.c({
          responseType: De.d().oneOf(
            ['pending_edits', 'accept', 'reject'],
            'Please select a response type'
          ),
          message: De.d().when('responseType', {
            is: 'pending_edits',
            then: De.d().required(
              'Must include a message when requesting edits'
            )
          })
        }),
        $n = { responseType: 'unselected', message: '' },
        ea = function (e) {
          var t,
            n,
            c = Object(s.useState)(),
            o = Object(h.a)(c, 2),
            r = o[0],
            i = o[1],
            l = Object(s.useState)(!0),
            d = Object(h.a)(l, 2),
            u = d[0],
            j = d[1],
            b = Object(s.useState)(!1),
            O = Object(h.a)(b, 2),
            g = O[0],
            x = O[1],
            f = Object(Se.c)({
              resolver: Object(Ie.yupResolver)(Xn),
              reValidateMode: 'onChange',
              defaultValues: $n
            }),
            v = f.register,
            m = f.handleSubmit,
            y = f.errors,
            S = f.control,
            C = Object(p.g)().id
          Object(s.useEffect)(function () {
            P()
          }, [])
          var P = function () {
            W.get('/proposal/'.concat(C))
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
            : Object(a.jsxs)(re.a, {
                maxWidth: 'lg',
                children: [
                  Object(a.jsx)(Ft, {}),
                  Object(a.jsx)(J.a, { children: 'Proposal Details' }),
                  Object(a.jsx)(Be, {
                    value: r.title,
                    label: 'Title',
                    variant: 'outlined',
                    readOnly: !0
                  }),
                  Object(a.jsx)(qe, {
                    label: 'Description',
                    value: r.description,
                    readOnly: !0
                  }),
                  Object(a.jsx)(qe, {
                    label: 'Choose Me Message',
                    value: r.chooseMessage,
                    readOnly: !0
                  }),
                  Object(a.jsx)(qe, {
                    label: 'Additional Notes',
                    value: r.additionalNotes,
                    readOnly: !0
                  }),
                  'studentDefined' === r.type
                    ? Object(a.jsxs)(a.Fragment, {
                        children: [
                          Object(a.jsx)(qe, {
                            label: 'Environment',
                            value: r.environment,
                            readOnly: !0
                          }),
                          Object(a.jsx)(qe, {
                            label: 'Languages',
                            value: r.languages,
                            readOnly: !0
                          })
                        ]
                      })
                    : null,
                  'submitted' === r.status &&
                    Object(a.jsx)(k, {
                      I: 'respond',
                      this: new Qn(r),
                      children: Object(a.jsx)('form', {
                        onSubmit: m(function (e) {
                          x(!0),
                            W.post('/proposal/respond/'.concat(r._id), e)
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
                        children: Object(a.jsxs)(de.a, {
                          elevation: 2,
                          style: { padding: '20px', marginTop: '10px' },
                          children: [
                            Object(a.jsx)(J.a, {
                              align: 'center',
                              component: 'h1',
                              variant: 'h5',
                              children: 'Proposal Response'
                            }),
                            Object(a.jsxs)(Kn.a, {
                              container: !0,
                              children: [
                                Object(a.jsxs)(Kn.a, {
                                  item: !0,
                                  xs: 2,
                                  children: [
                                    Object(a.jsx)(we.a, {
                                      variant: 'outlined',
                                      style: { width: '100%' },
                                      error: !!y.responseType,
                                      children: Object(a.jsx)(Se.a, {
                                        render: function (e) {
                                          var t = e.onChange,
                                            n = e.value
                                          return Object(a.jsxs)(Ae.a, {
                                            value: n,
                                            onChange: function (e) {
                                              return t(e.target.value)
                                            },
                                            style: { marginTop: '16px' },
                                            children: [
                                              Object(a.jsx)(ke.a, {
                                                value: 'unselected',
                                                selected: !0,
                                                disabled: !0,
                                                children: 'Choose One'
                                              }),
                                              Object(a.jsx)(ke.a, {
                                                value: 'pending_edits',
                                                style: { color: 'orange' },
                                                children: 'Request Edits'
                                              }),
                                              Object(a.jsx)(ke.a, {
                                                value: 'accepted',
                                                style: { color: 'green' },
                                                children: 'Accept'
                                              }),
                                              Object(a.jsx)(ke.a, {
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
                                    Object(a.jsx)(ze.a, {
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
                                Object(a.jsx)(Kn.a, {
                                  item: !0,
                                  xs: 8,
                                  children: Object(a.jsx)(Be, {
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
                                Object(a.jsx)(Kn.a, {
                                  item: !0,
                                  xs: 2,
                                  children: Object(a.jsx)(ye, {
                                    style: {
                                      height: '56px',
                                      marginTop: '16px'
                                    },
                                    disabled: g,
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
        ta = Object(ve.a)(function (e) {
          return {
            grid: { marginTop: e.spacing(2) },
            gridItem: { padding: e.spacing(1) },
            gridItemLabel: { textAlign: 'right', lineHeight: e.spacing(0.25) },
            gridItemContent: {}
          }
        }),
        na = De.c({ superviseStudentTopics: De.b(), abbr: De.d().required() }),
        aa = { superviseStudentTopics: !1, abbr: '' }
      function sa(e) {
        var t,
          n = ta(),
          c = Object(s.useState)(!0),
          o = Object(h.a)(c, 2),
          r = o[0],
          i = o[1],
          l = Object(s.useState)(!1),
          u = Object(h.a)(l, 2),
          b = u[0],
          p = u[1],
          O = Object(s.useState)(),
          g = Object(h.a)(O, 2),
          x = g[0],
          f = g[1],
          v = Object(Se.c)({
            resolver: Object(Ie.yupResolver)(na),
            reValidateMode: 'onChange',
            defaultValues: aa
          }),
          m = v.reset,
          y = v.handleSubmit,
          S = v.control,
          C = v.register,
          P = v.errors
        Object(s.useEffect)(function () {
          W.get('/supervisor/me')
            .then(function (e) {
              console.log(e), f(e.data.supervisor)
            })
            .catch(function (e) {
              return console.log(e)
            })
            .finally(function () {
              i(!1)
            })
        }, []),
          Object(s.useEffect)(
            function () {
              x &&
                m({
                  superviseStudentTopics: x.superviseStudentTopics,
                  abbr: x.abbr
                })
            },
            [x]
          )
        var T = (function () {
          var e = Object(j.a)(
            d.a.mark(function e(t) {
              return d.a.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      console.log(t),
                        p(!0),
                        W.post('/supervisor/me/edit', t)
                          .then(function (e) {
                            console.log(e)
                          })
                          .catch(function (e) {
                            return console.log(e)
                          })
                          .finally(function () {
                            p(!1)
                          })
                    case 3:
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
        return r
          ? Object(a.jsx)('h1', { children: 'Loading ...' })
          : Object(a.jsxs)(re.a, {
              maxWidth: 'lg',
              component: de.a,
              children: [
                Object(a.jsx)(J.a, { children: 'Supervisor Settings' }),
                Object(a.jsxs)('form', {
                  onSubmit: y(T),
                  children: [
                    Object(a.jsxs)(Kn.a, {
                      container: !0,
                      className: n.grid,
                      children: [
                        Object(a.jsx)(Kn.a, {
                          item: !0,
                          xs: 4,
                          className: [n.gridItem, n.gridItemLabel],
                          children: Object(a.jsx)(gt.a, {
                            title: 'Supervise student defined proposals',
                            children: Object(a.jsx)(J.a, {
                              children: 'Supervise Student Proposals'
                            })
                          })
                        }),
                        Object(a.jsx)(Kn.a, {
                          item: !0,
                          xs: 8,
                          className: n.gridItem,
                          children: Object(a.jsx)(Se.a, {
                            name: 'superviseStudentTopics',
                            control: S,
                            render: function (e) {
                              var t = e.onChange,
                                n = e.value
                              return Object(a.jsx)(ie.a, {
                                onChange: function (e) {
                                  return t(e.target.checked)
                                },
                                checked: n
                              })
                            }
                          })
                        }),
                        Object(a.jsx)(Kn.a, {
                          item: !0,
                          xs: 4,
                          className: [n.gridItem, n.gridItemLabel],
                          children: Object(a.jsx)(J.a, {
                            children: 'Supervisor Abbreviation'
                          })
                        }),
                        Object(a.jsx)(Kn.a, {
                          item: !0,
                          xs: 8,
                          className: n.gridItem,
                          children: Object(a.jsx)(Fe.a, {
                            fullWidth: !0,
                            size: 'small',
                            inputRef: C,
                            type: 'text',
                            name: 'abbr',
                            placeholder:
                              'Supervisor Abbreviation (John Ryan -> JRyn)',
                            error: !!P.abbr,
                            helperText:
                              null === P ||
                              void 0 === P ||
                              null === (t = P.abbr) ||
                              void 0 === t
                                ? void 0
                                : t.message
                          })
                        })
                      ]
                    }),
                    Object(a.jsx)(ye, {
                      disabled: b,
                      children: b ? 'Updating . . .' : 'Save Changes'
                    })
                  ]
                })
              ]
            })
      }
      var ca = n(70),
        oa = n.n(ca),
        ra = n(490),
        ia = function (e) {
          var t = Object(s.useState)(!0),
            n = Object(h.a)(t, 2),
            c = n[0],
            o = n[1],
            r = Object(s.useState)(!1),
            i = Object(h.a)(r, 2),
            l = i[0],
            d = i[1],
            u = Object(s.useState)(),
            j = Object(h.a)(u, 2),
            b = j[0],
            p = j[1],
            O = Object(s.useState)({ message: '', severity: 'success' }),
            g = Object(h.a)(O, 2),
            x = g[0],
            f = g[1],
            v = Object(s.useState)(!1),
            m = Object(h.a)(v, 2),
            y = m[0],
            S = m[1]
          Object(s.useEffect)(function () {
            W.get('/phase/all')
              .then(function (e) {
                console.log(e)
                var t = e.data.phases.map(function (e) {
                  return { phase: e._id, date: oa()(e.start_date) }
                })
                console.log(t), p(t)
              })
              .catch(function (e) {
                console.log(e)
              })
              .finally(function () {
                o(!1)
              })
          }, [])
          return c
            ? Object(a.jsx)('h1', { children: 'Loading' })
            : Object(a.jsxs)(re.a, {
                maxWidth: 'lg',
                children: [
                  Object(a.jsx)('h1', { children: 'Phase Management' }),
                  Object(a.jsx)(le.a, {
                    component: de.a,
                    children: Object(a.jsxs)(ue.a, {
                      'aria-label': 'simple table',
                      children: [
                        Object(a.jsx)(je.a, {
                          children: Object(a.jsxs)(be.a, {
                            children: [
                              Object(a.jsx)(he.a, { children: 'Phase No.' }),
                              Object(a.jsx)(he.a, {
                                children: 'Phase Start Date'
                              })
                            ]
                          })
                        }),
                        Object(a.jsx)(pe.a, {
                          children:
                            0 === b.length
                              ? Object(a.jsx)(be.a, {
                                  children: Object(a.jsx)(he.a, {
                                    children: 'No Phases to display'
                                  })
                                })
                              : b.map(function (e) {
                                  return Object(a.jsxs)(
                                    be.a,
                                    {
                                      children: [
                                        Object(a.jsx)(he.a, {
                                          children: e.phase
                                        }),
                                        Object(a.jsx)(he.a, {
                                          children: Object(a.jsx)(ra.a, {
                                            defaultValue: e.date,
                                            onChange: function (t) {
                                              return (function (e, t) {
                                                console.log(
                                                  'Updating phase',
                                                  t,
                                                  e
                                                )
                                                var n = Object(tt.a)(b)
                                                ;(n[t - 1].date = e),
                                                  console.log(n),
                                                  p(n)
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
                  Object(a.jsx)(ye, {
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
                        W.post('/phase/edit', { phases: n })
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
                    disabled: l,
                    children: 'Update Phase Dates'
                  }),
                  Object(a.jsx)(Gt, {
                    open: y,
                    setOpen: S,
                    message: x.message,
                    severity: x.severity
                  })
                ]
              })
        },
        la = Object(ve.a)(function (e) {
          return {
            heading: { fontSize: '28px' },
            paragraph: { fontSize: '16px' }
          }
        })
      function da() {
        var e = la()
        return Object(a.jsxs)(re.a, {
          maxWidth: 'lg',
          children: [
            Object(a.jsx)(J.a, {
              className: e.heading,
              children: 'What are Topics?'
            }),
            Object(a.jsx)(J.a, {
              className: e.paragraph,
              children:
                'A topic is a FYP project idea which is supplied by a Supervisor.'
            }),
            Object(a.jsx)(J.a, {
              className: e.heading,
              children: 'What are Proposals?'
            }),
            Object(a.jsx)(J.a, {
              className: e.paragraph,
              children:
                'A proposal is a students intrepretation of a topic, proposals can be both supervisor defined (The Supervisor has thought of the idea) or student defined (The Student has thought of the idea). Student defined proposals can only be sent to supervisors who have made themselves available to supervise these types of project ideas.'
            }),
            Object(a.jsx)(J.a, {
              className: e.heading,
              children: 'What are Phases?'
            }),
            Object(a.jsx)(J.a, {
              className: e.paragraph,
              children:
                'Phases are used to allow specific actions to be carried out during different time ranges.'
            })
          ]
        })
      }
      var ua = function (e) {
          var t,
            n = N(e.user),
            c = Object(s.useContext)(P).currentPhase,
            o = function (e) {
              return Array.isArray(e) ? e.includes(c.phase) : e === c.phase
            }
          return Object(a.jsxs)(p.c, {
            children: [
              Object(a.jsx)(p.a, {
                exact: !0,
                path: '/',
                children:
                  0 !== c.phase
                    ? (
                        null === e ||
                        void 0 === e ||
                        null === (t = e.user) ||
                        void 0 === t
                          ? void 0
                          : t.role
                      )
                      ? Object(a.jsx)(dt, {})
                      : Object(a.jsx)(Gn, {})
                    : Object(a.jsx)('h1', {
                        children: 'Switching Phase Please Wait'
                      })
              }),
              Object(a.jsx)(p.a, {
                exact: !0,
                path: '/help',
                children: Object(a.jsx)(da, {})
              }),
              n.can('read', 'Topic') &&
                o([3, 4]) &&
                Object(a.jsx)(p.a, {
                  exact: !0,
                  path: '/topics',
                  children: Object(a.jsx)(st, {})
                }),
              Object(a.jsx)(p.a, {
                path: '/topics/view/:code',
                children: Object(a.jsx)(Mn, {})
              }),
              n.can('create', 'Topic') &&
                o(2) &&
                Object(a.jsx)(p.a, { path: '/topics/add', component: ct }),
              n.can('manage', 'Topic') &&
                o([2, 3, 4]) &&
                Object(a.jsx)(p.a, { path: '/topics/manage', component: et }),
              n.can('read', 'Proposal') &&
                Object(a.jsx)(p.a, {
                  path: '/topic/:topicId',
                  children: Object(a.jsx)(Jn, {})
                }),
              n.can('manage', 'Proposal') &&
                Object(a.jsx)(p.a, {
                  exact: !0,
                  path: '/proposals',
                  component: In
                }),
              n.can('create', 'Proposal') &&
                Object(a.jsx)(p.a, {
                  exact: !0,
                  path: '/proposals/add/step2',
                  children: Object(a.jsx)(Y, {
                    children: Object(a.jsx)(qn, {})
                  })
                }),
              n.can('create', 'Proposal') &&
                Object(a.jsx)(p.a, {
                  exact: !0,
                  path: '/proposals/add/finish',
                  children: Object(a.jsx)(Y, {
                    children: Object(a.jsx)(Hn, {})
                  })
                }),
              n.can('create', 'Proposal') &&
                Object(a.jsx)(p.a, {
                  path: '/proposals/add/:topicCode?',
                  children: Object(a.jsx)(Y, {
                    children: Object(a.jsx)(Wn, {})
                  })
                }),
              n.can('read', 'Proposal') &&
                Object(a.jsx)(p.a, {
                  exact: !0,
                  path: '/proposal/view/:id',
                  children: Object(a.jsx)(ea, {})
                }),
              n.can('manage', 'Student') &&
                Object(a.jsx)(p.a, {
                  path: '/student/assign',
                  children: Object(a.jsx)(Yt, {})
                }),
              n.can('manage', 'Student') &&
                o(1) &&
                Object(a.jsx)(p.a, {
                  path: '/student/manage',
                  children: Object(a.jsx)(Qt, {})
                }),
              n.can('manage', 'Supervisor') &&
                o(1) &&
                Object(a.jsx)(p.a, {
                  path: '/supervisor/assign',
                  children: Object(a.jsx)(Xt, {})
                }),
              n.can('manage', 'Supervisor') &&
                o(1) &&
                Object(a.jsx)(p.a, {
                  path: '/supervisor/manage',
                  children: Object(a.jsx)(tn, {})
                }),
              n.can('manage', 'Coordinator') &&
                o(1) &&
                Object(a.jsx)(p.a, {
                  path: '/coordinator',
                  children: Object(a.jsx)(ln, {})
                }),
              n.can('manage', 'Coordinator') &&
                Object(a.jsx)(p.a, {
                  path: '/settings',
                  children: Object(a.jsx)(sa, {})
                }),
              n.can('update', 'Phase') &&
                Object(a.jsx)(p.a, {
                  path: '/phase/manage',
                  children: Object(a.jsx)(ia, {})
                }),
              Object(a.jsx)(p.a, { component: Yn })
            ]
          })
        },
        ja = function () {
          var e = Object(s.useState)(!1),
            t = Object(h.a)(e, 2),
            n = t[0],
            c = t[1],
            o = Object(O.d)(),
            r = o.instance,
            i = o.accounts,
            l = o.inProgress,
            p = Object(O.c)(i[0] || {}),
            f = Object(s.useContext)(m),
            y = f.user,
            S = f.setUserObject,
            T = Object(s.useContext)(P).setCurrentPhase,
            w = Object(b.a)({}, v)
          return (
            Object(s.useEffect)(
              function () {
                var e, t
                p &&
                  'none' === l &&
                  ((e = r),
                  (t = p),
                  L || ((D = e), (M = t), (L = !0)),
                  (function (e, t) {
                    q || ((F = e), (B = t), (q = !0))
                  })(r, p),
                  r
                    .acquireTokenSilent(
                      Object(b.a)(Object(b.a)({}, v), {}, { account: p })
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
                                      z
                                        .get(
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
                                                  r,
                                                  i,
                                                  l,
                                                  j,
                                                  b,
                                                  h,
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
                                                            (s = Object(u.a)(
                                                              t.data.value
                                                            )),
                                                            (e.prev = 3),
                                                            s.s()
                                                        case 5:
                                                          if (
                                                            (o = s.n()).done
                                                          ) {
                                                            e.next = 15
                                                            break
                                                          }
                                                          if (
                                                            ((r = o.value),
                                                            (i =
                                                              x.appRoles[
                                                                r.appRoleId
                                                              ]))
                                                          ) {
                                                            e.next = 11
                                                            break
                                                          }
                                                          return (
                                                            console.log(
                                                              'Unknown role: ' +
                                                                JSON.stringify(
                                                                  r
                                                                )
                                                            ),
                                                            e.abrupt(
                                                              'continue',
                                                              13
                                                            )
                                                          )
                                                        case 11:
                                                          ;(l = i.priority),
                                                            (j = i.displayName),
                                                            l > n &&
                                                              ((n = l), (a = j))
                                                        case 13:
                                                          e.next = 5
                                                          break
                                                        case 15:
                                                          e.next = 20
                                                          break
                                                        case 17:
                                                          ;(e.prev = 17),
                                                            (e.t0 = e.catch(3)),
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
                                                            W.get(
                                                              '/phase'
                                                            ).catch(function (
                                                              e
                                                            ) {
                                                              console.log(
                                                                'Could not retrieve phase'
                                                              ),
                                                                console.log(e)
                                                            })
                                                          )
                                                        case 25:
                                                          ;(b = e.sent),
                                                            (h = null),
                                                            (h = b.data.phase
                                                              ? new C({
                                                                  phase:
                                                                    b.data.phase
                                                                      ._id,
                                                                  startDate:
                                                                    b.data.phase
                                                                      .start_date,
                                                                  endDate:
                                                                    b.data.phase
                                                                      .end_date
                                                                })
                                                              : new C({
                                                                  phase: 0,
                                                                  startDate: null,
                                                                  endDate: null
                                                                })),
                                                            console.log(
                                                              'phase',
                                                              h
                                                            ),
                                                            (h = {
                                                              phase: 3,
                                                              startDate: new Date(
                                                                Date.now() -
                                                                  864e6
                                                              ),
                                                              endDate: new Date(
                                                                Date.now() +
                                                                  864e6
                                                              )
                                                            }),
                                                            T(h),
                                                            (O = {
                                                              role: a,
                                                              id:
                                                                p.localAccountId
                                                            }),
                                                            console.log(O),
                                                            S(O),
                                                            c(!0)
                                                        case 34:
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
                                              return e.apply(this, arguments)
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
                    ))
              },
              [p, l, r]
            ),
            Object(a.jsx)(O.a, {
              interactionType: g.b.Redirect,
              authenticationRequest: w,
              errorComponent: K,
              loadingComponent: Q,
              children: n
                ? Object(a.jsxs)(A.Provider, {
                    value: N(y),
                    children: [
                      Object(a.jsx)(Cn, {}),
                      Object(a.jsx)(H.a, {}),
                      Object(a.jsx)(ua, { user: y })
                    ]
                  })
                : Object(a.jsx)(X, {})
            })
          )
        },
        ba = (n(411), n(489)),
        ha = n(488),
        pa = n(247),
        Oa = n.n(pa),
        ga = Object(ha.a)({
          palette: {
            primary: { main: '#556cd6' },
            secondary: { main: '#f55d42' },
            error: { main: Oa.a.A400 },
            background: { default: '#fff' }
          }
        }),
        xa = new g.c(f),
        fa = function () {
          return Object(a.jsx)(i.a, {
            children: Object(a.jsx)(ba.a, {
              theme: ga,
              children: Object(a.jsx)(O.b, {
                instance: xa,
                children: Object(a.jsx)(y, {
                  children: Object(a.jsx)(T, {
                    children: Object(a.jsx)(c.a.StrictMode, {
                      children: Object(a.jsx)(ja, {})
                    })
                  })
                })
              })
            })
          })
        }
      r.a.render(Object(a.jsx)(fa, {}), document.getElementById('root'))
    }
  },
  [[412, 1, 2]]
])
//# sourceMappingURL=main.68de5e42.chunk.js.map
